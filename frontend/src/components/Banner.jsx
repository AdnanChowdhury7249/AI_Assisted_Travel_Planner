import bannerImage from '../assets/banner'

const Banner = () => {

  return (
    <div className="w-full bg-amber-200 h-25 flex items-center lg end px-8">
      <img src={bannerImage}
        alt="Travel Planner Banner"
        className="w-full h-full object-cover" />
    </div>

  )

}

export default Banner
