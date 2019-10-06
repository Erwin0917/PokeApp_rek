import React from "react";
import Downshift from "downshift";
import Paper from "@material-ui/core/Paper";
import MenuItem, { MenuItemProps } from "@material-ui/core/MenuItem";
import { TextField } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField";
import { IFetchDefElement } from "../../interfaces/IFetchDefElement";
import { withRouter, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

type RenderInputProps = TextFieldProps & {
	ref?: React.Ref<HTMLDivElement>;
};

function renderInput(inputProps: RenderInputProps) {
	const { InputProps, ref, ...other } = inputProps;

	return (
		<TextField
			InputProps={{
				inputRef: ref,
				...InputProps
			}}
			{...other}
		/>
	);
}

interface RenderSuggestionProps {
	highlightedIndex: number | null;
	index: number;
	itemProps: MenuItemProps<"div", { button?: never }>;
	selectedItem: IFetchDefElement["name"];
	suggestion: IFetchDefElement;
}

function renderSuggestion(suggestionProps: RenderSuggestionProps) {
	const {
		suggestion,
		index,
		itemProps,
		highlightedIndex,
		selectedItem
	} = suggestionProps;
	const isHighlighted = highlightedIndex === index;
	const isSelected = (selectedItem || "").indexOf(suggestion.name) > -1;

	return (
		<MenuItem
			{...itemProps}
			key={suggestion.name}
			selected={isHighlighted}
			component="div"
			style={{
				fontWeight: isSelected ? 500 : 400
			}}
		>
			{suggestion.name}
		</MenuItem>
	);
}

function getSuggestions(
	value: string,
	suggestions: any[],
	{ showEmpty = false } = {}
) {
	const inputValue = value.trim().toLowerCase();
	const inputLength = inputValue.length;
	let count = 0;
	return inputLength === 0 && !showEmpty
		? []
		: suggestions.filter((suggestion: any) => {
				const keep =
					count < 15 &&
					suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

				if (keep) {
					count += 1;
				}

				return keep;
		  });
}

type Props = RouteComponentProps<{}> &
	React.HTMLProps<React.HTMLAttributes<HTMLElement>> & {
		suggestions: IFetchDefElement[];
	};

function SearchInput(props: Props) {
	const onClickSuggestionHandler = (pokemonName: string) => {
		props.history.push(`pokemon/details/${pokemonName}`);
	};

	return (
		<StyledSearchInput className={props.className}>
			<Downshift
				id="downshift-simple"
				onSelect={name => onClickSuggestionHandler(name)}
			>
				{({
					getInputProps,
					getItemProps,
					getLabelProps,
					getMenuProps,
					highlightedIndex,
					inputValue,
					isOpen,
					selectedItem
				}) => {
					const { onBlur, onFocus, ...inputProps } = getInputProps({
						placeholder: "Search in the list"
					});

					return (
						<div>
							{renderInput({
								fullWidth: true,
								InputLabelProps: getLabelProps({ shrink: true } as any),
								InputProps: { onBlur, onFocus },
								inputProps
							})}
							<div {...getMenuProps()}>
								{isOpen ? (
									<Paper square>
										{getSuggestions(inputValue!, props.suggestions).map(
											(suggestion: any, index: number) =>
												renderSuggestion({
													suggestion,
													index,
													itemProps: getItemProps({ item: suggestion.name }),
													highlightedIndex,
													selectedItem
												})
										)}
									</Paper>
								) : null}
							</div>
						</div>
					);
				}}
			</Downshift>
		</StyledSearchInput>
	);
}

export default withRouter(SearchInput);

const StyledSearchInput = styled.div`
	margin-bottom: 40px;
`;
