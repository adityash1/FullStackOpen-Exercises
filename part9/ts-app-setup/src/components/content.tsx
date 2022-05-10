import CoursePart from "../types";

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  const des: React.CSSProperties = {
    fontStyle: "italic",
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.type) {
    case "normal":
      return (
        <div>
          <span style={des}>{part.description}</span>
        </div>
      );
    case "groupProject":
      return <div>project exercises {part.groupProjectCount}</div>;
    case "submission":
      return (
        <div>
          <span style={des}>{part.description}</span>
          <br />
          submit to{" "}
          <a href={part.exerciseSubmissionLink}>
            {part.exerciseSubmissionLink}
          </a>
        </div>
      );
    case "special":
      return (
        <div>
          <span style={des}>{part.description}</span>
          <br />
          <span>requirements: {part.requirements.join(", ")}</span>
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Content = ({ parts }: { parts: CoursePart[] }): JSX.Element => {
  return (
    <>
      {parts.map((part, index) => (
        <>
          <span style={{ fontWeight: "bold" }}>
            {part.name} {part.exerciseCount}
          </span>
          <br />
          <Part key={index} part={part} />
          <br />
        </>
      ))}
    </>
  );
};

export default Content;
