import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';
import Header from '../components/Header';

const AdminRejectDetails = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState({});
  const [approved, setApproved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // load users
      const usersSnap = await getDocs(collection(db, 'users'));
      const usersMap = {};
      usersSnap.docs.forEach((d) => {
        usersMap[d.id] = d.data();
      });
      setUsers(usersMap);

      // load works with pending rejections
      const worksSnap = await getDocs(collection(db, 'works'));
      const allTasks = worksSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

      const tasksWithRejections = allTasks.filter((t) => {
        const rejections = t.rejections || {};
        return Object.keys(rejections).some(
          (uid) => !rejections[uid].approved
        );
      });
      setTasks(tasksWithRejections);

      // load approved rejections from rejectedWorks
      const rejectedSnap = await getDocs(collection(db, 'rejectedWorks'));
      const rejectedData = rejectedSnap.docs.map((d) => ({
        id: d.id,
        ...d.data()
      }));
      rejectedData.sort((a, b) => {
        const da = a.approvedAt ? new Date(a.approvedAt).getTime() : 0;
        const dbt = b.approvedAt ? new Date(b.approvedAt).getTime() : 0;
        return dbt - da;
      });
      setApproved(rejectedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (taskId, userId) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      const rejection = (task.rejections || {})[userId];

      // store approved rejection in rejectedWorks
      await addDoc(collection(db, 'rejectedWorks'), {
        workId: taskId,
        userId,
        title: task.title,
        description: task.description,
        date: task.date,
        priority: task.priority,
        assignedUserDetails: task.assignedUserDetails,
        assignedItems: task.assignedItems,
        rejectionReason: rejection.reason,
        rejectedAt: rejection.timestamp,
        approvedAt: new Date().toISOString()
      });

      const taskRef = doc(db, 'works', taskId);

      // remove user from assignment
      const updatedAssignedUsers = (task.assignedUsers || []).filter(
        (uid) => uid !== userId
      );
      const updatedUserDetails = (task.assignedUserDetails || []).filter(
        (detail) => detail.userId !== userId
      );

      // clean rejection, acceptance, roleCompletion for this user
      const rejections = { ...(task.rejections || {}) };
      delete rejections[userId];

      const userAcceptance = { ...(task.userAcceptance || {}) };
      delete userAcceptance[userId];

      const roleCompletion = { ...(task.roleCompletion || {}) };
      Object.keys(roleCompletion).forEach((key) => {
        if (key.startsWith(`${userId}_`)) {
          delete roleCompletion[key];
        }
      });

      await updateDoc(taskRef, {
        assignedUsers: updatedAssignedUsers,
        assignedUserDetails: updatedUserDetails,
        rejections,
        userAcceptance,
        roleCompletion
      });

      await fetchData();
    } catch (err) {
      console.error('Failed to approve:', err);
    }
  };

  const handleCancel = async (taskId, userId) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      const taskRef = doc(db, 'works', taskId);

      const rejections = { ...(task.rejections || {}) };
      const userAcceptance = { ...(task.userAcceptance || {}) };

      // remove this user's rejection entry
      delete rejections[userId];

      // send them back to pending acceptance
      userAcceptance[userId] = 'pending';

      await updateDoc(taskRef, {
        rejections,
        userAcceptance
      });

      await fetchData();
    } catch (err) {
      console.error('Failed to cancel rejection:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="admin" />
        <div className="flex flex-col items-center justify-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
          <p className="text-gray-600">Loading rejections...</p>
        </div>
      </div>
    );
  }

  // group approved by work for nicer UI
  const approvedByWork = approved.reduce((acc, r) => {
    const key = r.workId || r.id;
    if (!acc[key]) acc[key] = { workId: key, title: r.title, items: [] };
    acc[key].items.push(r);
    return acc;
  }, {});
  const approvedGroups = Object.values(approvedByWork);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="admin" />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        {/* Pending approvals */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Pending Rejection Approvals
        </h1>

        {tasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center mb-8">
            <p className="text-gray-600">No pending rejections.</p>
          </div>
        ) : (
          <div className="space-y-4 mb-10">
            {tasks.map((task) => {
              const rejections = task.rejections || {};

              return (
                <div
                  key={task.id}
                  className="bg-white rounded-lg shadow-md p-5"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    {task.title || 'Task'}
                  </h3>

                  {Object.entries(rejections)
                    .filter(([, rejection]) => !rejection.approved)
                    .map(([userId, rejection]) => (
                      <div
                        key={userId}
                        className="mb-3 p-4 bg-red-50 rounded-lg border border-red-100"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">
                              {users[userId]?.name || 'Unknown User'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(rejection.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApprove(task.id, userId)}
                              className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-700 flex items-center gap-1"
                            >
                              <FaCheck />
                              Approve
                            </button>
                            <button
                              onClick={() => handleCancel(task.id, userId)}
                              className="bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-300 flex items-center gap-1"
                            >
                              <FaTimes />
                              Cancel
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 bg-white p-3 rounded">
                          <span className="font-semibold">Reason: </span>
                          {rejection.reason}
                        </p>
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
        )}

        {/* Approved rejections */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          Approved Rejections
        </h2>

        {approvedGroups.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600">No approved rejections yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {approvedGroups.map((group) => (
              <div
                key={group.workId}
                className="bg-white rounded-lg shadow-md p-5 border border-green-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-800">
                    {group.title || 'Task'}
                  </h3>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                    <FaCheck />
                    Approved
                  </span>
                </div>

                <div className="space-y-3">
                  {group.items.map((r) => (
                    <div
                      key={r.id}
                      className="p-3 rounded border border-green-100 bg-green-50"
                    >
                      <p className="text-sm font-semibold text-gray-800 mb-1">
                        {users[r.userId]?.name || 'Unknown User'}
                      </p>
                      <p className="text-xs text-gray-500 mb-1">
                        Rejected:{' '}
                        {r.rejectedAt
                          ? new Date(r.rejectedAt).toLocaleString()
                          : '-'}
                        <br />
                        Approved:{' '}
                        {r.approvedAt
                          ? new Date(r.approvedAt).toLocaleString()
                          : '-'}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Reason: </span>
                        {r.rejectionReason || '-'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminRejectDetails;
