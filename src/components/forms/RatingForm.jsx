import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function RatingForm({ storeId, currentRating = null, onSubmit }) {
  const [rating, setRating] = useState(currentRating || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      setError('Rating must be between 1 and 5');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (currentRating) {
        // Update existing rating
        const { error: updateError } = await supabase
          .from('ratings')
          .update({ rating })
          .eq('user_id', user.id)
          .eq('store_id', storeId);

        if (updateError) throw updateError;
      } else {
        // Insert new rating
        const { error: insertError } = await supabase
          .from('ratings')
          .insert({
            user_id: user.id,
            store_id: storeId,
            rating,
          });

        if (insertError) throw insertError;
      }

      onSubmit?.();
    } catch (err) {
      setError(err.message || 'Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600 text-sm">{error}</div>}
      
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`text-3xl ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } cursor-pointer`}
          >
            ★
          </button>
        ))}
      </div>
      
      <button
        type="submit"
        disabled={loading || rating === 0}
        className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : currentRating ? 'Update Rating' : 'Submit Rating'}
      </button>
    </form>
  );
}
