const SuccessModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[320px] text-center">
        <h2 className="text-xl font-semibold">🎉 Success</h2>
        <p className="mt-2 text-gray-600">
          Image saved on blockchain successfully.
        </p>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
