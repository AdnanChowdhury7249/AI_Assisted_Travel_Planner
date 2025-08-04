import bannerImage from '../assets/banner.jpg';

const Banner = () => {
  return (
    <div className="w-full bg-gray-100">
      <img
        src={bannerImage}
        alt="Travel Planner Banner"
        className="w-full h-[400px] object-fill opacity-70"
      />
    </div>
  );
};

export default Banner;


