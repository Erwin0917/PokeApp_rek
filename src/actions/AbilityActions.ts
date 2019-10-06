import { IFetchDefElement } from "../interfaces/IFetchDefElement";
import { AbilityActionName } from "../const/AbilityActionName";

class AbilityActions {
	public static addAbilities(abilities: IFetchDefElement[]) {
		return {
			type: AbilityActionName.ADD_ABILITIES,
			payload: abilities
		};
	}
}

export default AbilityActions;
