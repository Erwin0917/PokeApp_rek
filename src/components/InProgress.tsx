import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import styled from "styled-components";

const StyledInProgressWrapper = styled.div`
	margin: 0 auto;
	background-color: white;
	border-radius: 8px;
	max-width: 600px;
	padding: 30px;
`;

class InProgress extends Component {
	render() {
		return (
			<StyledInProgressWrapper>
				<Typography variant="h2" component="h2">
					IN PROGRESS
				</Typography>
				<Typography variant="h6" component="h3">
					SORRY, THIS PAGE IS NOT READY.
				</Typography>
			</StyledInProgressWrapper>
		);
	}
}

export default InProgress;
