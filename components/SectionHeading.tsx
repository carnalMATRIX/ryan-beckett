function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div>
      <h3
        className={`uppercase font-roboto font-medium tracking-[5%] text-[23px] md:text-[30px] ${number !== "03" ? "px-5 md:px-0" : ""}`}
      >
        <span>{number}</span>
        <span className="text-crimson-bright">{" // "}</span>
        <span>{title}</span>
      </h3>
    </div>
  );
}

export default SectionHeading;
