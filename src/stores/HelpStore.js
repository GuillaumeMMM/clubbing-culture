import { observable, action, computed } from "mobx";

class HelpStore {

    @observable globalMapHelpOpen = true;
    @observable genresTreeHelpOpen = true;

    @action handleGlobalMapQuitHelp = () => {
        this.globalMapHelpOpen = false;
    }

    @action handleGlobalMapOpenHelp = () => {
        this.globalMapHelpOpen = true;
    }

    @action handleGenresTreeQuitHelp = () => {
        this.genresTreeHelpOpen = false;
    }

    @action handleGenresTreeOpenHelp = () => {
        this.genresTreeHelpOpen = true;
    }
}

const singleton = new HelpStore();
export default singleton;