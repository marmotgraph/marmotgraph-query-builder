import { FormStore } from "hbp-quickfire";
import KgInputTextField from "./KgInputTextField";
import KgTextAreaField from "./KgTextAreaField";
import DynamicDropdown from "./DynamicDropdown";
import DynamicDropdownStore from "./DynamicDropdownStore";

FormStore.registerCustomField("KgInputText", KgInputTextField, FormStore.typesMapping.InputText);
FormStore.registerCustomField("KgTextArea", KgTextAreaField, FormStore.typesMapping.TextArea);
FormStore.registerCustomField("DynamicDropdown", DynamicDropdown, DynamicDropdownStore);

export default {
  KgInputTextField:{
    component:KgInputTextField,
    store:FormStore.typesMapping.InputText
  },
  KgTextAreaField:{
    component:KgTextAreaField,
    store:FormStore.typesMapping.TextArea
  },
  DynamicDropdown:{
    component:DynamicDropdown,
    store:DynamicDropdownStore
  }
};