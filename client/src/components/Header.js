import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
	state = {};
	componentDidMount() {
		//this.props.fetchUser();
	}
	renderContent = () => {
		switch (this.props.user) {
			case null:
				return;
			case false:
				return <a href="/auth/google">Login With Google</a>;
			default:
				return <a href="/api/logout">Logout</a>;
		}
	};
	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link
						to={this.props.user ? "/surveys" : "/"}
						className="left brand-logo">
						Eemaily
					</Link>
					<ul className="right">
						<li>{this.renderContent()}</li>
					</ul>
				</div>
			</nav>
		);
	}
}
function mapStateToProps({ auth }) {
	return { auth };
}
export default connect(mapStateToProps)(Header);
