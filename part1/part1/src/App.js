const Header = (courseName) => {
  return (
    <>
      <h1>{courseName.name}</h1>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      <p>
        {parts[0].name} have {parts[0].exercises} exercises
      </p>
      <p>
        {parts[1].name} have {parts[1].exercises} exercises
      </p>
      <p>
        {parts[2].name} have {parts[2].exercises} exercises
      </p>
    </>
  );
};

const Total = ({ parts }) => {
  return (
    <>
      <p>
        There are total {parts[0].exercises + parts[1].exercises + parts[2].exercises} exercises
      </p>
    </>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default App