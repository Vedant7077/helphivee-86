
const CampaignLoadingState = () => {
  return (
    <div className="text-center py-16">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
      </div>
      <p className="mt-4 text-lg text-gray-600">Loading campaigns...</p>
    </div>
  );
};

export default CampaignLoadingState;
