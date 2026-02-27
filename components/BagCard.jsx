const CONDITION_COLORS = {
  excellent: 'bg-green-100 text-green-700',
  good: 'bg-yellow-100 text-yellow-700',
  fair: 'bg-orange-100 text-orange-700',
};

const STATUS_CONFIG = {
  available:    { label: 'Available',        classes: 'bg-green-100 text-green-700' },
  rented:       { label: 'Rented',           classes: 'bg-amber-100 text-amber-700' },
  under_review: { label: 'Coming Back Soon', classes: 'bg-cyan-100 text-cyan-700' },
};

export default function BagCard({ bag, onRequest, wishlisted, onToggleWishlist }) {
  const isAvailable = bag.status === 'available';
  const statusCfg = STATUS_CONFIG[bag.status];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col relative">
      {/* Photo */}
      {bag.photo_url ? (
        <img
          src={bag.photo_url}
          alt={`${bag.brand} ${bag.model}`}
          className="w-full h-56 object-cover"
        />
      ) : (
        <div className="w-full h-56 bg-[#E4DFF0] flex items-center justify-center text-[#B0A8C0] text-sm">
          No photo
        </div>
      )}

      {/* Heart button */}
      {onToggleWishlist && (
        <button
          onClick={() => onToggleWishlist(bag.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center hover:scale-110 transition-transform"
          title={wishlisted ? 'Remove from saved' : 'Save this bag'}
        >
          <span className={`text-lg leading-none ${wishlisted ? 'text-[#7B5EA7]' : 'text-gray-300'}`}>
            {wishlisted ? '♥' : '♡'}
          </span>
        </button>
      )}

      <div className="p-4 flex flex-col flex-1">
        {/* Brand / model + status badge row */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <p className="font-semibold text-[#2D2040]">{bag.brand}</p>
            <p className="text-sm text-gray-500">{bag.model}</p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            {statusCfg && (
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusCfg.classes}`}>
                {statusCfg.label}
              </span>
            )}
            {bag.condition && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CONDITION_COLORS[bag.condition] || 'bg-gray-100 text-gray-500'}`}>
                {bag.condition}
              </span>
            )}
          </div>
        </div>

        {bag.color && <p className="text-xs text-gray-400 mb-1">{bag.color}</p>}
        <p className="text-xs text-gray-400 mb-4">
          {bag.ownership_type === 'member' ? "Member's Bag" : 'House Bag'}
        </p>

        {isAvailable ? (
          <button
            onClick={() => onRequest(bag)}
            className="mt-auto w-full bg-[#7B5EA7] hover:bg-[#6a4f93] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
          >
            Request This Bag
          </button>
        ) : (
          <p className="mt-auto text-xs text-gray-400 text-center italic pt-3 border-t border-gray-100">
            {wishlisted
              ? "♥ Saved — we'll notify you when available"
              : 'Save to get notified when available'}
          </p>
        )}
      </div>
    </div>
  );
}
