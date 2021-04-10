import Navigation from './Navigation';

const Layout = (props: { children: React.ReactNode }) => {
	return (
		<div className="page-wrapper">
			<Navigation />
			<div className="page-content">{props.children}</div>
		</div>
	);
};

export default Layout;
