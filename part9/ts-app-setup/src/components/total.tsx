const Total = ({ total } : { total: number }) : JSX.Element => {
    return (
        <>
            <p>
                Number of exercises{" "}
                {total}
            </p>
        </>
    )
}
export default Total;
