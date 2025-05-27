const BottomText = () => {
  return (
    <div className="flex flex-col space-y-2 pb-14 justify-center items-center text-center mt-24">
      <h1 className="md:text-4xl text-2xl font-semibold">
        Do not miss the opportunity
      </h1>
      <p className="md:text-lg text-gray-500 pb-8">
        Fresh picks for your kitchen, smart picks for your life — shop veggies,
        fruits, and gadgets with ease
      </p>
      <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
        <input
          type="text"
          placeholder="Enter your email id"
          className="border border-gray-300 rounded-md h-full outline-none border-r-0 w-full rounded-r-none px-3 text-gray-500"
        ></input>
        <button className="md:px-12 px-8 h-full text-white bg-green-500 hover:bg-green-600 transition-all cursor-pointer rounded-md rounded-1-none">
          Subscribe
        </button>
      </form>
    </div>
  );
};
export default BottomText;
