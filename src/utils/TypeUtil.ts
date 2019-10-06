import { MainStore } from "./../reducers/mainReducer";
import { IFetchDefElement } from "./../interfaces/IFetchDefElement";
import mainStore from "../store/mainStore";
class TypeUtil {
	public static getAllTypes(): IFetchDefElement[] {
		const store = mainStore.getState() as MainStore;
		return store.types;
	}
}

export default TypeUtil;
