import bannerImage from '../assets/banner.jpg';

const Banner = () => {
  return (
    <div className="relative w-full h-[400px]">
      <img
        src={bannerImage}
        alt="Travel Planner Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold">TripPlanner</h1>
        <h2 className="mt-4 text-lg md:text-2xl font-medium">
          Turn your travel dreams into perfectly planned adventures
        </h2>
      </div>
    </div>
  );
};

export default Banner;
