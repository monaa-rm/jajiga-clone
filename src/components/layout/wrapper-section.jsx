const WrapperSection = ({ children, title, title_desc, rounded }) => {
  return (
    <section
      className={`flex flex-col gap-3 pt-8 px-1 pb-3 xl:px-28 ${
        rounded ? "-mt-3 rounded-tl-2xl rounded-tr-2xl z-20 bg-white" : null
      }`}
    >
      <div>
        <h1 className="text-gray-800 pr-2 text-xl">{title}</h1>
        {title_desc && (
          <span className="text-gray-600 pr-2 text-sm">{title_desc}</span>
        )}
      </div>
      {children}
    </section>
  );
};

export default WrapperSection;
