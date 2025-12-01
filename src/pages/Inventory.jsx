import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FaBox, FaSearch, FaPlus, FaSpinner } from 'react-icons/fa';
import Header from '../components/Header';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    itemNo: '',
    itemName: '',
    details: ''
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'inventory'));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
      // sort alphabetically by itemName
      data.sort((a, b) => {
        const nameA = (a.itemName || '').toLowerCase();
        const nameB = (b.itemName || '').toLowerCase();
        return nameA.localeCompare(nameB);
      });

      setItems(data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      await addDoc(collection(db, 'inventory'), {
        ...formData,
        createdAt: new Date().toISOString()
      });

      setMessage({ type: 'success', text: 'Item added successfully!' });
      setFormData({ itemNo: '', itemName: '', details: '' });
      setShowAddForm(false);
      await fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
      setMessage({ type: 'error', text: 'Failed to add item.' });
    } finally {
      setSaving(false);
    }
  };

  const normalizedSearch = searchText.trim().toLowerCase();

  const filteredItems = items.filter((item) => {
    if (!normalizedSearch) return true;

    const name = (item.itemName || '').toLowerCase();
    const no = (item.itemNo || '').toLowerCase();

    return name.includes(normalizedSearch) || no.includes(normalizedSearch);
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="admin" />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Inventory
          </h1>

          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setMessage({ type: '', text: '' });
            }}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded bg-green-600 text-white text-sm font-semibold hover:bg-green-700"
          >
            <FaPlus />
            {showAddForm ? 'Cancel' : 'Add Item'}
          </button>
        </div>

        {message.text && (
          <div
            className={`mb-4 p-3 rounded text-sm ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Add New Item
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Item No
                </label>
                <input
                  type="text"
                  name="itemNo"
                  value={formData.itemNo}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Details
                </label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-green-600 text-white py-2 px-4 rounded font-semibold hover:bg-green-700 transition disabled:opacity-50 text-sm"
              >
                {saving ? 'Adding...' : 'Add Item'}
              </button>
            </form>
          </div>
        )}

        {/* Search */}
        <div className="relative mb-4">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by item name or number..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-gray-600">
            <FaSpinner className="animate-spin text-xl text-blue-600" />
            <span>Loading inventory...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaBox className="mx-auto text-4xl text-gray-400 mb-2" />
            <p className="text-gray-600 text-sm">
              {searchText ? 'No items match your search.' : 'No items in inventory.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                    {item.itemName}
                  </h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {item.itemNo}
                  </span>
                </div>
                {item.details && (
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {item.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Inventory;
