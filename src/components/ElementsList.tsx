import React from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

const StyledList = styled(List)`
	left: 50%;
	transform: translateX(-50%);
	margin: 40px 0;
	max-width: 600px;
	border: 1px solid #f73651;
	border-radius: 8px;
	overflow: hidden;
`;

const StyledHeader = styled(ListSubheader)`
	&&& {
		background-color: white;
	}
`;

const StyledListElement = styled(NavLink)`
	text-decoration: none;
	color: #f73651;
`;

const StyledLoaderWrappe = styled.div`
	display: flex;
	justify-content: center;
	padding: 40px 0;
`;

interface listElements {
	name: string;
	url: string;
}

interface Props {
	listTitle: string;
	listElements: listElements[];
	urlType: any;
}

const ElementsList = (props: Props) => {
	const renderList = (list: any[]) => {
		if (list.length === 0) {
			return (
				<StyledLoaderWrappe>
					<CircularProgress />
				</StyledLoaderWrappe>
			);
		}
		return list.map((element: listElements) => {
			return (
				<StyledListElement
					to={{
						pathname: `${props.urlType}/details/${element.name}`
					}}
					key={element.name}
				>
					<ListItem button>
						<ListItemText primary={element.name} />
					</ListItem>
				</StyledListElement>
			);
		});
	};

	const { listTitle, listElements } = props;
	return (
		<StyledList subheader={<StyledHeader>{listTitle}</StyledHeader>}>
			{renderList(listElements)}
		</StyledList>
	);
};

export default ElementsList;
