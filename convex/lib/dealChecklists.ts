export const STAGE_CHECKLISTS = {
    reservation: [
        { id: "res_1", title: "Reservationsavgift mottagen", isRequired: true },
        { id: "res_2", title: "Pass/ID uppladdat", isRequired: true },
        { id: "res_3", title: "Objekt markerat som reserverat", isRequired: true },
        { id: "res_4", title: "Bekräftelse skickad till kund", isRequired: false },
    ],

    contract: [
        { id: "con_1", title: "NIE-ansökan påbörjad", isRequired: true },
        { id: "con_2", title: "Advokat vald", isRequired: true },
        { id: "con_3", title: "Köpekontrakt granskat av advokat", isRequired: true },
        { id: "con_4", title: "Köpekontrakt signerat", isRequired: true },
        { id: "con_5", title: "Handpenning (10%) betald", isRequired: true },
        { id: "con_6", title: "Finansiering ordnad", isRequired: false },
    ],

    due_diligence: [
        { id: "dd_1", title: "Nota Simple granskad", isRequired: true },
        { id: "dd_2", title: "Inga skulder på fastigheten", isRequired: true },
        { id: "dd_3", title: "Bygglov verifierat", isRequired: true },
        { id: "dd_4", title: "IBI (fastighetsskatt) betald", isRequired: true },
        { id: "dd_5", title: "Samfällighetsavgifter kontrollerade", isRequired: false },
        { id: "dd_6", title: "Energicertifikat mottaget", isRequired: true },
        { id: "dd_7", title: "Advokatrapport godkänd", isRequired: true },
    ],

    escritura: [
        { id: "esc_1", title: "Escritura-datum bokat", isRequired: true },
        { id: "esc_2", title: "NIE-nummer mottaget", isRequired: true },
        { id: "esc_3", title: "Flygbiljetter bokade (eller fullmakt)", isRequired: true },
        { id: "esc_4", title: "Slutbetalning överfört", isRequired: true },
        { id: "esc_5", title: "Notarieavgift förberedd", isRequired: true },
        { id: "esc_6", title: "ITP (skatt) förberedd", isRequired: true },
        { id: "esc_7", title: "Escritura signerad", isRequired: true },
    ],

    completion: [
        { id: "comp_1", title: "Nycklar överlämnade", isRequired: true },
        { id: "comp_2", title: "Mätarställningar fotograferade", isRequired: true },
        { id: "comp_3", title: "Inventarielista genomgången", isRequired: false },
        { id: "comp_4", title: "Överlämningsprotokoll signerat", isRequired: true },
        { id: "comp_5", title: "Objekt markerat som sålt", isRequired: true },
    ],

    after_sales: [
        { id: "as_1", title: "El-kontrakt ändrat", isRequired: false },
        { id: "as_2", title: "Vatten-kontrakt ändrat", isRequired: false },
        { id: "as_3", title: "Anmält till samfälligheten", isRequired: false },
        { id: "as_4", title: "Hemförsäkring tecknad", isRequired: false },
        { id: "as_5", title: "Internet/TV ordnat", isRequired: false },
        { id: "as_6", title: "1-månads uppföljning gjord", isRequired: false },
    ],
};
