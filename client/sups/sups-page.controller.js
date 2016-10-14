

function SupsPageController(supsAPIService, flashesService, $interval) {
    const ctrl = this;
    ctrl.editedSup = {};

    function getSups() {
        supsAPIService.sups.get().$promise.then((data) => {
            ctrl.sups = data.results;
        });
    }

    getSups();
    $interval(getSups, 5000);

    ctrl.saveSup = function saveSup(editedSup) {
        supsAPIService.sups.save(editedSup).$promise.then((savedSup) => {
            ctrl.sups = [
                savedSup,
                ...ctrl.sups,
            ];
            ctrl.editedSup = {};
            flashesService.displayMessage('Sup Created', 'success');
        });
    };

}

export default SupsPageController;