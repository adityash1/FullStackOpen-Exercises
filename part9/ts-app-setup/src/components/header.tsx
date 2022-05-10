const Header = ({ name } : { name: string }) : JSX.Element => {
    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}
export default Header;

