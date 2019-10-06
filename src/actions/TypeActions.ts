import { TypeActionName } from "../const/TypeActionName";
import { IFetchDefElement } from "../interfaces/IFetchDefElement";

class TypeActions {
	public static addTypes(types: IFetchDefElement[]) {
		return {
			type: TypeActionName.ADD_TYPES,
			payload: types
		};
	}
}

export default TypeActions;
