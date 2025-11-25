/* import { useParams } from "react-router-dom";
import CandidateRecommend from "./Recommendations/CandidateRecommend";

const ParentComponent = () => {
  const params = useParams();

  return (
    <div>
      {params.id ? (
        <CandidateRecommend jobId={params.id} />
      ) : (
        <div className="p-4 text-red-600">No job ID provided</div>
      )}
    </div>
  );
};

export default ParentComponent;
 */ import RecommendationComponent from "./CandidateRecommend";

const MyPage = () => {
  return (
    <div>
      {/* Other content */}
      <RecommendationComponent />
      {/* More content */}
    </div>
  );
};

export default MyPage;
