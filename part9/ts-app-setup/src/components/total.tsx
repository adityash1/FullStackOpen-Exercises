const Total = ({ total } : { total: number }) : JSX.Element => {
    return (
        <div>
            <p>
                Number of exercises{" "}
                {total}
            </p>
        </div>
    )
}
export default Total;
