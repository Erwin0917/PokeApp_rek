import { MainStore } from "./../reducers/mainReducer";
import { IFetchDefElement } from "./../interfaces/IFetchDefElement";
import mainStore from "../store/mainStore";

class AbilityUtil {
	public static getAllAbilities(): IFetchDefElement[] {
		const store = mainStore.getState() as MainStore;
		return store.abilities;
	}
}

export default AbilityUtil;
