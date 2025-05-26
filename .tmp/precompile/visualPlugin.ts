import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import DialogConstructorOptions = powerbiVisualsApi.extensibility.visual.DialogConstructorOptions;
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];
var customSearchableSlicer4B41DAD5D1744836A722B9706165251C: IVisualPlugin = {
    name: 'customSearchableSlicer4B41DAD5D1744836A722B9706165251C',
    displayName: 'CustomSearchableSlicer',
    class: 'Visual',
    apiVersion: '5.11.0',
    create: (options?: VisualConstructorOptions) => {
        if (Visual) {
            return new Visual(options);
        }
        throw 'Visual instance not found';
    },
    createModalDialog: (dialogId: string, options: DialogConstructorOptions, initialState: object) => {
        const dialogRegistry = (<any>globalThis).dialogRegistry;
        if (dialogId in dialogRegistry) {
            new dialogRegistry[dialogId](options, initialState);
        }
    },
    custom: true
};
if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["customSearchableSlicer4B41DAD5D1744836A722B9706165251C"] = customSearchableSlicer4B41DAD5D1744836A722B9706165251C;
}
export default customSearchableSlicer4B41DAD5D1744836A722B9706165251C;