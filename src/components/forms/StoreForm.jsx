import { useState } from 'react';
import { supabase } from '../../lib/supabase';

const validateName = (name) => {
  if (name.length < 3 || name.length > 60) {
    return 'Name must be 3-60 characters';
  }
  return '';
};

const validateAddress = (address) => {
  return address.length <= 400 ? '' : 'Address must be max 400 characters';
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? '' : 'Invalid email format';
};

export default function StoreForm({ store = null, onSubmit }) {
  const [formData, setFormData] = useState({
    name: store?.name || '',
    email: store?.email || '',
    address: store?.address || '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const addressError = validateAddress(formData.address);
    if (addressError) newErrors.address = addressError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      if (store?.id) {
        // Update store
        const { error } = await supabase
          .from('stores')
          .update(formData)
          .eq('id', store.id);

        if (error) throw error;
      } else {
        // Create new store
        const { error } = await supabase
          .from('stores')
          .insert([formData]);

        if (error) throw error;
      }

      onSubmit?.();
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to save store' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {errors.submit && <div className="text-red-600 text-sm">{errors.submit}</div>}
      
      <div>
        <input
          type="text"
          name="name"
          placeholder="Store Name (3-60 characters)"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.name ? 'border-red-600' : ''}`}
          required
        />
        {errors.name && <span className="text-red-600 text-xs">{errors.name}</span>}
      </div>
      
      <div>
        <input
          type="email"
          name="email"
          placeholder="Store Email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.email ? 'border-red-600' : ''}`}
          required
        />
        {errors.email && <span className="text-red-600 text-xs">{errors.email}</span>}
      </div>
      
      <div>
        <input
          type="text"
          name="address"
          placeholder="Store Address (max 400 characters)"
          value={formData.address}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.address ? 'border-red-600' : ''}`}
          required
        />
        {errors.address && <span className="text-red-600 text-xs">{errors.address}</span>}
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Saving...' : store ? 'Update Store' : 'Create Store'}
      </button>
    </form>
  );
}
