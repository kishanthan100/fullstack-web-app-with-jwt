import forbiddenImage from "../../assets/403.jpg";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <img
        src={forbiddenImage}
        alt="Access Forbidden"
        className="w-80 mb-6"
      />

      <h1 className="text-3xl font-bold text-red-600 mb-2">
        403 - Forbidden
      </h1>

      <p className="text-gray-600">
        You do not have permission to access this page.
      </p>
    </div>
  );
};

export default Forbidden;