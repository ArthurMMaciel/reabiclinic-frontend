import ToggleTheme from "../ToggleTheme/ToggleTheme"

const Header = ({user}) => {
    return <div className="flex h-20 bg-primary-100 dark:bg-secondary-100 justify-between items-center px-5 sm:rounded-xl sm:m-5">
        <span className="text-gray-100 font-raleway"> Olá, {user?.name || "Usuário"}</span>
        <h1 className="text-gray-100 text-xl font-raleway">Newsletter</h1>
        <ToggleTheme className="h-8 text-gray-100 hidden sm:block cursor-pointer" />
    </div>
}

export default Header