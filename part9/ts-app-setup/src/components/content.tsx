interface CoursePart {
    name: string;
    exerciseCount: number;
}

const Content = ({ parts }: { parts: CoursePart[] }) : JSX.Element => {
    return (
        <div>
            {parts.map(part => (
                <div key={part.name}>
                    <p>
                        {part.name} {part.exerciseCount}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default Content;