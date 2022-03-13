import Country from "./Country";

const Content = ({ countries }) => {
  return (
    <>
      {countries.length > 9 ? (
        "Too many matches, specify another filter"
      ) : (
        <dl>
          {countries.map((country) => (
            <Country
              country={country}
              single={countries.length === 1 ? true : false}
              key={country.alpha2Code}
            />
          ))}
        </dl>
      )}
    </>
  );
};

export default Content;
