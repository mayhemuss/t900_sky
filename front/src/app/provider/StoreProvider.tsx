import {ReactNode} from "react";
import {StateSchema} from "../../store/types/StateShema";
import {createReduxStore} from "../../store/store";
import {Provider} from "react-redux";




interface StoreProviderProps {
  children?: ReactNode;

}

export const StoreProvider = (props: StoreProviderProps) => {
  const {
    children,

  } = props;

  const store = createReduxStore();

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
