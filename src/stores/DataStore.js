import { observable, action, computed } from "mobx";
import React, { Component } from 'react';
import ParisText from '../components/elements/citiestexts/ParisText';
import LondonText from '../components/elements/citiestexts/LondonText';
import AmsterdamText from '../components/elements/citiestexts/AmsterdamText';
import BarcelonaText from '../components/elements/citiestexts/BarcelonaText';
import BerlinText from '../components/elements/citiestexts/BerlinText';

// import { alimentation_generale_2018, alimentation_generale_2017, alimentation_generale_2016 } from '../assets/data/paris/Alimentation_Generale.js';
// import { badaboum_2018 } from '../assets/data/paris/Badaboum.js';
// import { concrete_2018 } from '../assets/data/paris/Concrete.js';
// import { djoon_2018 } from '../assets/data/paris/Djoon.js';
// import { rex_club_2018 } from '../assets/data/paris/Rex_Club.js';
// // import { a_la_folie_paris_2018 } from '../assets/data/paris/A_La_Folie_Paris.js';
// import { faust_2018 } from '../assets/data/paris/Faust.js';
// import { folies_pigalle_2018, folies_pigalle_2017 } from '../assets/data/paris/Folies_Pigalle.js';
// import { gaite_lyrique_2018, gaite_lyrique_2017 } from '../assets/data/paris/Gaite_Lyrique.js';
// import { garage_2018 } from '../assets/data/paris/Garage.js';
// import { komma_paris_2018, komma_paris_2017 } from '../assets/data/paris/Komma_Paris.js';
// import { l_international_2018, l_international_2017 } from '../assets/data/paris/L_International.js';
// import { l_officine_2_2018, l_officine_2_2017 } from '../assets/data/paris/L_Officine_2.js';
// import { la_clairiere_2018, la_clairiere_2017 } from '../assets/data/paris/La_Clairiere.js';
// import { la_java_2018, la_java_2017 } from '../assets/data/paris/La_Java.js';
// import { la_machine_du_moulin_rouge_2018 } from '../assets/data/paris/La_Machine_Du_Moulin_Rouge.js';
// import { la_mano_2018 } from '../assets/data/paris/La_Mano.js';
// import { la_plage_du_glazart_2018, la_plage_du_glazart_2017 } from '../assets/data/paris/La_Plage_Du_Glazart.js';
// import { la_rotonde_2018, la_rotonde_2017 } from '../assets/data/paris/La_Rotonde.js';
// import { la_station_gare_des_mines_2018, la_station_gare_des_mines_2017 } from '../assets/data/paris/La_Station_Gare_Des_Mines.js';
// import { le_9b_2018, le_9b_2017, le_9b_2016 } from '../assets/data/paris/Le_9B.js';
// import { le_45_tours_2018, le_45_tours_2017, le_45_tours_2016 } from '../assets/data/paris/Le_45_Tours.js';
// import { le_gambetta_club_2018, le_gambetta_club_2017 } from '../assets/data/paris/Le_Gambetta_Club.js';
// import { le_jardin_suspendu_2018, le_jardin_suspendu_2017 } from '../assets/data/paris/Le_Jardin_Suspendu.js';
// import { le_klub_2018, le_klub_2017 } from '../assets/data/paris/Le_Klub.js';
// import { le_pavillon_des_canaux_2018 } from '../assets/data/paris/Le_Pavillon_Des_Canaux.js';
// import { nodd_club_2018 } from '../assets/data/paris/Nodd_Club.js';
// import { nouveau_casino_2018 } from '../assets/data/paris/Nouveau_Casino.js';
// import { nuits_fauves_2018, nuits_fauves_2017 } from '../assets/data/paris/Nuits_Fauves.js';
// // import { magazine_club_2018 } from '../assets/data/paris/Magazine_Club.js';
// import { panic_room_2018 } from '../assets/data/paris/Panic_Room.js';
// import { petit_bain_2018, petit_bain_2017 } from '../assets/data/paris/Petit_Bain.js';
// import { station_e_2018 } from '../assets/data/paris/Station_E.js';
// import { wanderlust_2018, wanderlust_2017 } from '../assets/data/paris/Wanderlust.js';
// import { yoyo_2018, yoyo_2017 } from '../assets/data/paris/Yoyo.js';


// //  LONDON
// import { basing_house_2018 } from '../assets/data/london/Basing_House.js';
// import { brixton_jamm_2018 } from '../assets/data/london/Brixton_Jamm';
// import { clf_art_cafe_2018 } from '../assets/data/london/CLF_Art_Cafe';
// import { corsica_studios_2018 } from '../assets/data/london/Corsica_Studios';
// import { e1_london_2018 } from '../assets/data/london/E1_London';
// import { egg_london_2018 } from '../assets/data/london/Egg_London';
// import { fabric_2018 } from '../assets/data/london/Fabric';
// import { five_miles_2018 } from '../assets/data/london/Five_Miles';
// import { fold_2018 } from '../assets/data/london/FOLD';
// import { giant_steps_2018 } from '../assets/data/london/Giant_Steps';
// import { junction_house_2018 } from '../assets/data/london/Junction_House';
// import { lightbox_2018 } from '../assets/data/london/Lightbox';
// import { lion_and_lamb_2018 } from '../assets/data/london/Lion_And_Lamb';
// import { lockside_camden_2018 } from '../assets/data/london/Lockside_Camden';
// import { micks_garage_2018 } from '../assets/data/london/Micks_Garage';
// import { ministry_of_sound_2018 } from '../assets/data/london/Ministry_Of_Sound';
// import { night_tales_2018 } from '../assets/data/london/Night_Tales';
// import { phonox_2018 } from '../assets/data/london/Phonox';
// import { proud_embankment_2018 } from '../assets/data/london/Proud_Embankment';
// import { rye_wax_2018 } from '../assets/data/london/Rye_Way';
// import { shoreditch_platform_2018 } from '../assets/data/london/Shoreditch_Platform';
// import { studio_338_2018 } from '../assets/data/london/Studio_338';
// import { studio_9294_2018 } from '../assets/data/london/Studio_9294';
// import { the_cause_2018 } from '../assets/data/london/The_Cause';
// import { the_jazz_cafe_2018 } from '../assets/data/london/The_Jazz_Cafe';
// import { the_old_queens_head_2018 } from '../assets/data/london/The_Old_Queens_Head';
// import { the_pickle_factory_2018 } from '../assets/data/london/The_Pickle_Factory';
// import { the_prince_of_wales_2018 } from '../assets/data/london/The_Prince_Of_Wales';
// import { the_waiting_room_2018 } from '../assets/data/london/The_Waiting_Room';
// import { the_yard_2018 } from '../assets/data/london/The_Yard';
// import { tola_2018 } from '../assets/data/london/Tola';
// import { union_club_2018 } from '../assets/data/london/Union_Club';
// import { village_underground_2018 } from '../assets/data/london/Village_Underground';
// import { xoyo_2018 } from '../assets/data/london/XOYO';


// // AMSTERDAM
// import { bret_2018 } from '../assets/data/amsterdam/BRET';
// import { canvas_2018 } from '../assets/data/amsterdam/Canvas';
// import { claire_2018 } from '../assets/data/amsterdam/Claire';
// import { club_nl_2018 } from '../assets/data/amsterdam/Club_NL';
// import { de_marktkantine_2018 } from '../assets/data/amsterdam/De_Marktkantine';
// import { de_school_2018 } from '../assets/data/amsterdam/De_School';
// import { disco_dolly_2018 } from '../assets/data/amsterdam/Disco_Dolly';
// import { garage_noord_2018 } from '../assets/data/amsterdam/Garage_Noord';
// import { jack_2018 } from '../assets/data/amsterdam/JACK';
// import { john_doe_2018 } from '../assets/data/amsterdam/John_Doe';
// import { melkweg_2018 } from '../assets/data/amsterdam/Melkweg';
// import { noorderling_2018 } from '../assets/data/amsterdam/Noorderling';
// import { oosterbar_2018 } from '../assets/data/amsterdam/Oosterbar';
// import { ot301_2018 } from '../assets/data/amsterdam/OT301';
// import { radio_radio_2018 } from '../assets/data/amsterdam/Radio_Radio';
// import { radion_2018 } from '../assets/data/amsterdam/RADION';
// import { shelter_amsterdam_2018 } from '../assets/data/amsterdam/Shelter_Amsterdam';
// import { sugar_factory_2018 } from '../assets/data/amsterdam/Sugar_Factory';
// import { thuishaven_2018 } from '../assets/data/amsterdam/Thuishaven';
// import { undrgrnd_2018 } from '../assets/data/amsterdam/Undrgrnd';



// // BARCELONA
// import { bajo_fondo_club_2018 } from '../assets/data/barcelona/Bajo_Fondo_Club';
// import { city_hall_2018 } from '../assets/data/barcelona/City_Hall';
// import { el_rouge_2018 } from '../assets/data/barcelona/El_Rouge';
// import { garage_442_2018 } from '../assets/data/barcelona/Garage_442';
// import { input_high_fidelity_dance_club_2018 } from '../assets/data/barcelona/INPUT_High_Fidelity_Dance_Club';
// import { kreuzberg_club_2018 } from '../assets/data/barcelona/Kreuzberg_Club';
// import { la_terrrazza_2018 } from '../assets/data/barcelona/La_Terrrazza';
// import { laut_2018 } from '../assets/data/barcelona/LAUT';
// import { macarena_club_2018 } from '../assets/data/barcelona/Macarena_Club';
// import { moog_club_2018 } from '../assets/data/barcelona/Moog_Club';
// import { nitsa_2018 } from '../assets/data/barcelona/Nitsa';
// import { pacha_barcelona_2018 } from '../assets/data/barcelona/Pacha_Barcelona';
// import { r33_2018 } from '../assets/data/barcelona/R33';
// import { razzmatazz_2018 } from '../assets/data/barcelona/Razzmatazz';
// import { red58_2018 } from '../assets/data/barcelona/RED58';
// import { switch_bar_2018 } from '../assets/data/barcelona/Switch_Bar';
// import { the_side_up_2018 } from '../assets/data/barcelona/The_Side_Up';


// //  BERLIN
// import { about_blank_2018 } from '../assets/data/berlin/About_Blank';
// import { acud_macht_neu_2018 } from '../assets/data/berlin/Acud_Macht_NEU';
// import { arkaoda_berlin_2018 } from '../assets/data/berlin/Arkaoda_Berlin';
// import { ava_club_2018 } from '../assets/data/berlin/AVA_Club';
// import { berghain_2018 } from '../assets/data/berlin/Berghain';
// import { bohnengold_2018 } from '../assets/data/berlin/Bohnengold';
// import { brigit_2018 } from '../assets/data/berlin/Brigit';
// import { cassiopeia_2018 } from '../assets/data/berlin/Cassiopeia';
// import { chalet_2018 } from '../assets/data/berlin/Chalet';
// import { club_der_visionaere_2018 } from '../assets/data/berlin/Club_Der_Visionaere';
// import { crack_bellmer_2018 } from '../assets/data/berlin/Crack_Bellmer';
// import { der_weiße_hase_2018 } from '../assets/data/berlin/Der_Weiße_Hase';
// import { else_2018 } from '../assets/data/berlin/Else';
// import { farbfernseher_2018 } from '../assets/data/berlin/Farbfernseher';
// import { golden_gate_2018 } from '../assets/data/berlin/Golden_Gate';
// import { gretchen_2018 } from '../assets/data/berlin/Gretchen';
// import { griessmuehle_2018 } from '../assets/data/berlin/Griessmuehle';
// import { ipsə_2018 } from '../assets/data/berlin/Ipsə';
// import { kater_blau_2018 } from '../assets/data/berlin/Kater_Blau';
// import { mensh_meier_2018 } from '../assets/data/berlin/Mensh_Meier';
// import { minimal_bar_2018 } from '../assets/data/berlin/Minimal_Bar';
// import { ohm_2018 } from '../assets/data/berlin/OHM';
// import { paloma_2018 } from '../assets/data/berlin/Paloma';
// import { polygon_club_2018 } from '../assets/data/berlin/polygon_Club';
// import { promenaden_eck_2018 } from '../assets/data/berlin/Promaden_Eck';
// import { ritter_butzke_2018 } from '../assets/data/berlin/Ritter_Butzke';
// import { salon_zur_Widen_renate_2018 } from '../assets/data/berlin/Salon_Zur_Wilden_Renate';
// import { sisyphos_2018 } from '../assets/data/berlin/Sisyphos';
// import { solar_2018 } from '../assets/data/berlin/Solar';
// import { suicide_club_2018 } from '../assets/data/berlin/Suicide_Club';
// import { süss_war_gestern_2018 } from '../assets/data/berlin/Süss_War_Gestern';
// import { tresor_2018 } from '../assets/data/berlin/Tresor';
// import { void_club_2018 } from '../assets/data/berlin/Void_Club';
// import { watergate_2018 } from '../assets/data/berlin/Watergate';
// import { zu_mir_oder_zu_dir_2018 } from '../assets/data/berlin/Zu_Mir_Oder_Zu_Dir';


import { citiesGenresSumup_Paris } from '../assets/computedData/Paris/js/citiesGenresSumup-Paris.js';
import { clubsStats_Paris } from '../assets/computedData/Paris/js/clubsStats-Paris';
import { parisLimits } from '../assets/data/paris-contour.js';

import { citiesGenresSumup_London } from '../assets/computedData/London/js/citiesGenresSumup-London.js';
import { clubsStats_London } from '../assets/computedData/London/js/clubsStats-London';
import { londonLimits } from '../assets/data/london_contour';

import { citiesGenresSumup_Amsterdam } from '../assets/computedData/Amsterdam/js/citiesGenresSumup-Amsterdam.js';
import { clubsStats_Amsterdam } from '../assets/computedData/Amsterdam/js/clubsStats-Amsterdam';
// import { londonLimits } from '../assets/data/london_contour';

import { citiesGenresSumup_Barcelona } from '../assets/computedData/Barcelona/js/citiesGenresSumup-Barcelona.js';
import { clubsStats_Barcelona } from '../assets/computedData/Barcelona/js/clubsStats-Barcelona';
// import { londonLimits } from '../assets/data/london_contour';

import { citiesGenresSumup_Berlin } from '../assets/computedData/Berlin/js/citiesGenresSumup-Berlin.js';
import { clubsStats_Berlin } from '../assets/computedData/Berlin/js/clubsStats-Berlin';
// import { londonLimits } from '../assets/data/london_contour';

class DataStore {
    // @observable clubs_Paris = [
    //     {
    //         name: 'Alimentation Générale',
    //         // data: alimentation_generale_2018.concat(alimentation_generale_2018).concat(alimentation_generale_2016),
    //         data: alimentation_generale_2018,
    //         pos: {lat:'48.8667779',lon: '2.3743747'},
    //         zone: '11e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'Badaboum',
    //         data: badaboum_2018,
    //         pos: {lat:'48.8535282',lon: '2.375755'},
    //         zone: '11e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'Concrete',
    //         data: concrete_2018,
    //         pos: {lat:'48.8434308',lon: '2.3671561'},
    //         zone: '12e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'Djoon',
    //         data: djoon_2018,
    //         pos: {lat:'48.8365668',lon: '2.3692448'},
    //         zone: '13e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'Rex Club',
    //         data: rex_club_2018,
    //         pos: {lat: '48.8708367', lon: '2.3459807'},
    //         zone: '2e arr.',
    //         ville: 'Paris'
    //     },
    //     // {
    //     //     name: 'A La Folie Paris',
    //     //     data: a_la_folie_paris2018Formatted,
    //     //     pos: {lat: '48.8950245', lon: '2.3829538'},
    //     //     zone: '19e arr.',
    //     //     ville: 'Paris'
    //     // },
    //     {
    //         name: 'Faust',
    //         data: faust_2018,
    //         pos: {lat: '48.8630748', lon: '2.3109391'},
    //         zone: '7e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'Folies Pigalle',
    //         // data: folies_pigalle_2018.concat(folies_pigalle_2017),
    //         data: folies_pigalle_2018,
    //         pos: {lat:'48.8819719',lon: '2.3347836'},
    //         zone: '9e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'La Gaité Lyrique',
    //         // data: gaite_lyrique_2018.concat(gaite_lyrique_2017),
    //         data: gaite_lyrique_2018,
    //         pos: {lat:'48.8668941',lon: '2.3512075'},
    //         zone: '3e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'Garage',
    //         data: garage_2018,
    //         pos: {lat:'48.8398693',lon: '2.3690949'},
    //         zone: '13e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'Komma Paris',
    //         // data: komma_paris_2018.concat(komma_paris_2017),
    //         data: komma_paris_2018,
    //         pos: {lat:'48.8702451',lon: '2.3008602'},
    //         zone: '8e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'L\'International',
    //         data: l_international_2018,
    //         // data: l_international_2018.concat(l_international_2017),
    //         pos: {lat: '48.8669722', lon: '2.3747752'},
    //         zone: '11e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'L\'Officine',
    //         data: l_officine_2_2018,
    //         // data: l_officine_2_2018.concat(l_officine_2_2017),
    //         pos: {lat: '48.8626591', lon: '2.3468855'},
    //         zone: '1er arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'La Clairière',
    //         data: la_clairiere_2018,
    //         // data: la_clairiere_2018.concat(la_clairiere_2017),
    //         pos: {lat: '48.8648494', lon: '2.2353129'},
    //         zone: 'Longchamp',
    //         ville: 'Longchamp'
    //     },
    //     {
    //         name: 'La Java',
    //         // data: la_java_2018.concat(la_java_2017),
    //         data: la_java_2018,
    //         pos: {lat: '48.8710788', lon: '2.3716347'},
    //         zone: '10e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'La Machine Du Moulin Rouge',
    //         data: la_machine_du_moulin_rouge_2018,
    //         pos: {lat: '48.884201', lon: '2.3300461'},
    //         zone: '18e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'La Mano',
    //         data: la_mano_2018,
    //         pos: {lat: '48.8761187', lon: '2.342248'},
    //         zone: '9e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'La Plage Du Glazart',
    //         data: la_plage_du_glazart_2018,
    //         // data: la_plage_du_glazart_2018.concat(la_plage_du_glazart_2017),
    //         pos: {lat: '48.899543', lon: '2.386724'},
    //         zone: '19e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'La Rotonde',
    //         // data: la_rotonde_2018.concat(la_rotonde_2017),
    //         data: la_rotonde_2018,
    //         pos: {lat: '48.8835881', lon: '2.3674946'},
    //         zone: '19e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'La Station',
    //         data: la_station_gare_des_mines_2018,
    //         // data: la_station_gare_des_mines_2018.concat(la_station_gare_des_mines_2017),
    //         pos: {lat: '48.9012591', lon: '2.367799'},
    //         zone: '18e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'Le 9B',
    //         // data: le_9b_2018.concat(le_9b_2017).concat(le_9b_2016),
    //         data: le_9b_2018,
    //         pos: {lat: '48.8754344', lon: '2.3714659'},
    //         zone: '19e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'Le 45 Tours',
    //         data: le_45_tours_2018,
    //         // data: le_45_tours_2018.concat(le_45_tours_2017).concat(le_45_tours_2016),
    //         pos: {lat: '48.8505355', lon: '2.3859854'},
    //         zone: '11e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'Le Gambetta Club',
    //         // data: le_gambetta_club_2018.concat(le_gambetta_club_2017),
    //         data: le_gambetta_club_2018,
    //         pos: {lat: '48.8594913', lon: '2.4009005'},
    //         zone: '20e arr.',
    //         ville: 'Paris'
    //     },
    //     // {
    //     //     name: 'Magazine Club',
    //     //     data: magazine_club_2018,
    //     //     pos: {lat: '48.8760849', lon: '2.3435276'},
    //     //     zone: '9e arr.',
    //     //     ville: 'Paris'
    //     // },
    //     {
    //         name: 'Le Jardin Suspendu',
    //         // data: le_jardin_suspendu_2018.concat(le_jardin_suspendu_2017),
    //         data: le_jardin_suspendu_2018,
    //         pos: {lat: '48.8313662', lon: '2.2735838'},
    //         zone: 'Issy-Les-Moulineaux',
    //         ville: 'Issy-Les-Moulineaux'
    //     },
    //     {
    //         name: 'Le Klub',
    //         data: le_klub_2018,
    //         // data: le_klub_2018.concat(le_klub_2017),
    //         pos: {lat: '48.8591429', lon: '2.3452927'},
    //         zone: '1er arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'Le Pavillon Des Canaux',
    //         data: le_pavillon_des_canaux_2018,
    //         pos: {lat: '48.8876941', lon: '2.371403'},
    //         zone: '19e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'Nodd Club',
    //         data: nodd_club_2018,
    //         pos: {lat: '48.8880947', lon: '2.2478511'},
    //         zone: 'Courbevoie',
    //         ville: 'Courbevoie'
    //     },
    //     {
    //         name: 'Nouveau Casino',
    //         data: nouveau_casino_2018,
    //         pos: {lat: '48.8658713', lon: '2.3757035'},
    //         zone: '11e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'Nuits Fauves',
    //         data: nuits_fauves_2018,
    //         // data: nuits_fauves_2018.concat(nuits_fauves_2017),
    //         pos: {lat: '48.8404252', lon: '2.368628'},
    //         zone: '13e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'Panic Room',
    //         data: panic_room_2018,
    //         pos: {lat: '48.8612171', lon: '2.3654'},
    //         zone: '11e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'Petit Bain',
    //         // data: petit_bain_2018.concat(petit_bain_2017),
    //         data: petit_bain_2018,
    //         pos: {lat: '48.8355263', lon: '2.3745184'},
    //         zone: '13e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'Station E',
    //         data: station_e_2018,
    //         pos: {lat: '48.8552993', lon: '2.4174028'},
    //         zone: 'Montreuil',
    //         ville: 'Montreuil'
    //     },
    //     {
    //         name: 'Wanderlust',
    //         data: wanderlust_2018,
    //         // data: wanderlust_2018.concat(wanderlust_2017),
    //         pos: {lat: '48.8403263', lon: '2.368258'},
    //         zone: '13e arr.',
    //         ville: 'Paris'
    //     },
    //     {
    //         name: 'YoYo',
    //         data: yoyo_2018,
    //         // data: yoyo_2018.concat(yoyo_2017),
    //         pos: {lat: '48.8661801', lon: '2.2975371'},
    //         zone: '16e arr.',
    //         ville: 'Paris'
    //     },
    // ];

    // @observable clubs_London = [
    //     {
    //         name: 'Basing House',
    //         data: basing_house_2018,
    //         pos: {lat:'51.5288974',lon: '-0.0780368'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Brixton Jamm',
    //         data: brixton_jamm_2018,
    //         pos: {lat:'51.4709047',lon: '-0.1148251'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'CLF Art Cafe',
    //         data: clf_art_cafe_2018,
    //         pos: {lat:'51.4699201',lon: '-0.0699007'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Corsica Studios',
    //         data: corsica_studios_2018,
    //         pos: {lat:'51.4935469',lon: '-0.1009054'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'E1 London',
    //         data: e1_london_2018,
    //         pos: {lat:'51.5088091',lon: '-0.0637461'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Egg London',
    //         data: egg_london_2018,
    //         pos: {lat:'51.5417203',lon: '-0.127385'},  //  Change from here
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Fabric',
    //         data: fabric_2018,
    //         pos: {lat:'51.5195769',lon: '-0.1046993'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Five Miles',
    //         data: five_miles_2018,
    //         pos: {lat:'51.5832616',lon: '-0.0664249'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'FOLD',
    //         data: fold_2018,
    //         pos: {lat:'51.519181',lon: '0.00371'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Giant Steps',
    //         data: giant_steps_2018,
    //         pos: {lat:'51.5377837',lon: '-0.0235255'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Junction House',
    //         data: junction_house_2018,
    //         pos: {lat:'51.5455901',lon: '-0.0777968'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Lightbox',
    //         data: lightbox_2018,
    //         pos: {lat:'51.4851179',lon: '-0.1259394'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Lion And Lamb',
    //         data: lion_and_lamb_2018,
    //         pos: {lat:'51.5296027',lon: '-0.0836479'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Lockside Camden',
    //         data: lockside_camden_2018,
    //         pos: {lat:'51.5409403',lon: '-0.14876'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Micks Garage',
    //         data: micks_garage_2018,
    //         pos: {lat:'51.5431778',lon: '-0.0250681'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Ministry Of Sound',
    //         data: ministry_of_sound_2018,
    //         pos: {lat:'51.4977037',lon: '-0.1016852'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Night Tales',
    //         data: night_tales_2018,
    //         pos: {lat:'51.5473603',lon: '-0.055049'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Phonox',
    //         data: phonox_2018,
    //         pos: {lat:'51.4644877',lon: '-0.1166975'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Proud Embankment',
    //         data: proud_embankment_2018,
    //         pos: {lat:'51.5099854',lon: '-0.1202584'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Rye Wax',
    //         data: rye_wax_2018,
    //         pos: {lat:'51.4699163',lon: '-0.0696904'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Shoreditch Platform',
    //         data: shoreditch_platform_2018,
    //         pos: {lat:'51.5273914',lon: '-0.0803948'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Studio 338',
    //         data: studio_338_2018,
    //         pos: {lat:'51.4953149',lon: '0.0025567'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Studio 9294',
    //         data: studio_9294_2018,
    //         pos: {lat:'51.544262',lon: '-0.0248449'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'The Cause',
    //         data: the_cause_2018,
    //         pos: {lat:'51.5900275',lon: '-0.0643257'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'The Jazz Cafe',
    //         data: the_jazz_cafe_2018,
    //         pos: {lat:'51.5387157',lon: '-0.14527'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'The Old Queens Head',
    //         data: the_old_queens_head_2018,
    //         pos: {lat:'51.5372173',lon: '-0.102562'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'The Pickle Factory',
    //         data: the_pickle_factory_2018,
    //         pos: {lat:'51.533059',lon: '-0.0611597'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'The Prince Of Wales',
    //         data: the_prince_of_wales_2018,
    //         pos: {lat:'51.4615138',lon: '-0.1171373'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'The Waiting Room',
    //         data: the_waiting_room_2018,
    //         pos: {lat:'51.5620857',lon: '-0.1440061'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'The Yard',
    //         data: the_yard_2018,
    //         pos: {lat:'51.542964',lon: '-0.024285'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Tola',
    //         data: tola_2018,
    //         pos: {lat:'51.4736177',lon: '-0.0708372'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Union Club',
    //         data: union_club_2018,
    //         pos: {lat:'51.4869815',lon: '-0.1231073'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'Village Underground',
    //         data: village_underground_2018,
    //         pos: {lat:'51.5235787',lon: '-0.0806746'},
    //         ville: 'London'
    //     },
    //     {
    //         name: 'XOYO',
    //         data: xoyo_2018,
    //         pos: {lat:'51.5254819',lon: '-0.0879565'},
    //         ville: 'London'
    //     },
    // ]

    // @observable clubs_Amsterdam = [
    //     {
    //         name: 'BRET',
    //         data: bret_2018,
    //         pos: {lat:'52.389852',lon: '4.8345748'},
    //         ville: 'Amsterdam'
    //     },
    //     {
    //         name: 'Canvas',
    //         data: canvas_2018,
    //         pos: {lat:'52.3537424',lon: '4.9097843'},
    //         ville: 'Amsterdam'
    //     },
    //     {
    //         name: 'Claire',
    //         data: claire_2018,
    //         pos: {lat:'52.3664417',lon: '4.8960912'},
    //         ville: 'Amsterdam'
    //     },
    //     {
    //         name: 'Club NL',
    //         data: club_nl_2018,
    //         pos: {lat:'52.3721164',lon: '4.8887283'},
    //         ville: 'Amsterdam'
    //     },
    //     {
    //         name: 'De Marktkantine',
    //         data: de_marktkantine_2018,
    //         pos: {lat:'52.376208',lon: '4.8648073'},
    //         ville: 'Amsterdam'
    //     },
    //     {
    //         name: 'De School',
    //         data: de_school_2018,
    //         pos: {lat:'52.3706191',lon: '4.842551'},
    //         ville: 'Amsterdam'
    //     },
    //     {
    //         name: 'Disco Dolly',
    //         data: disco_dolly_2018,
    //         pos: {lat:'52.3680748',lon: '4.8879967'},
    //         ville: 'Amsterdam'
    //     },
    //     {
    //         name: 'Garage Noord',
    //         data: garage_noord_2018,
    //         pos: {lat:'52.3855729',lon: '4.923531'},
    //         ville: 'Amsterdam'
    //     },
    //     {
    //         name: 'JACK Amsterdam',
    //         data: jack_2018,
    //         pos: {lat:'52.3069924',lon: '4.9462897'},
    //         ville: 'Amsterdam'
    //     },
    //     {
    //         name: 'John Doe',
    //         data: john_doe_2018,
    //         pos: {lat:'52.3665233',lon: '4.8975191'},
    //         ville: 'Amsterdam'
    //     },
    //     {
    //         name: 'Melkweg',
    //         data: melkweg_2018,
    //         pos: {lat:'52.364786',lon: '4.8790602'},
    //         ville: 'Amsterdam'
    //     },
    //     {
    //         name: 'Noorderling',
    //         data: noorderling_2018,
    //         pos: {lat:'52.4013659',lon: '4.8880339'},
    //         ville: 'Amsterdam'
    //     },
    //     {
    //         name: 'OOSTerBAR',
    //         data: oosterbar_2018,
    //         pos: {lat:'52.3608454',lon: '4.9167133'},
    //         ville: 'Amsterdam'
    //     },
    //     {
    //         name: 'OT301',
    //         data: ot301_2018,
    //         pos: {lat:'52.3600834',lon: '4.863499'},
    //         ville: 'Amsterdam'
    //     },
    //     {
    //         name: 'Radio Radio',
    //         data: radio_radio_2018,
    //         pos: {lat:'52.3860851',lon: '4.8718872'},
    //         ville: 'Amsterdam'
    //     },
    //     {
    //         name: 'RADION Amsterdam',
    //         data: radion_2018,
    //         pos: {lat:'52.3456108',lon: '4.8234916'},
    //         ville: 'Amsterdam'
    //     },
    //     {
    //         name: 'Shelter Amsterdam',
    //         data: shelter_amsterdam_2018,
    //         pos: {lat:'52.3838075',lon: '4.9007305'},
    //         ville: 'Amsterdam'
    //     },
    //     {
    //         name: 'Sugar Factory',
    //         data: sugar_factory_2018,
    //         pos: {lat:'52.3650904',lon: '4.8813066'},
    //         ville: 'Amsterdam'
    //     },
    //     {
    //         name: 'Thuishaven',
    //         data: thuishaven_2018,
    //         pos: {lat:'52.396583',lon: '4.8543243'},
    //         ville: 'Amsterdam'
    //     },
    //     {
    //         name: 'Undrgrnd',
    //         data: undrgrnd_2018,
    //         pos: {lat:'52.366478',lon: '4.8954074'},
    //         ville: 'Amsterdam'
    //     }
    // ]

    // @observable clubs_Barcelona = [
    //     {
    //         name: 'Bajo Fondo Club',
    //         data: bajo_fondo_club_2018,
    //         pos: {lat:'41.378518',lon: '2.1636543'},
    //         ville: 'Barcelona'
    //     },
    //     {
    //         name: 'Disco City Hall',
    //         data: city_hall_2018,
    //         pos: {lat:'41.3875006',lon: '2.1677569'},
    //         ville: 'Barcelona'
    //     },
    //     {
    //         name: 'El Rouge',
    //         data: el_rouge_2018,
    //         pos: {lat:'41.374157',lon: '2.1635723'},
    //         ville: 'Barcelona'
    //     },
    //     {
    //         name: 'Garage 442',
    //         data: garage_442_2018,
    //         pos: {lat:'41.3971023',lon: '2.1585562'},
    //         ville: 'Barcelona'
    //     },
    //     {
    //         name: 'INPUT High Fidelity Dance Club',
    //         data: input_high_fidelity_dance_club_2018,
    //         pos: {lat:'41.3688517',lon: '2.1446703'},
    //         ville: 'Barcelona'
    //     },
    //     // {
    //     //     name: 'Kreuzberg Club',
    //     //     data: kreuzberg_club_2018,
    //     //     pos: {lat:'52.389852',lon: '4.8345748'},
    //     //     ville: 'Barcelona'
    //     // },
    //     {
    //         name: 'La Terrrazza',
    //         data: la_terrrazza_2018,
    //         pos: {lat:'41.3687962',lon: '2.1471803'},
    //         ville: 'Barcelona'
    //     },
    //     {
    //         name: 'LAUT',
    //         data: laut_2018,
    //         pos: {lat:'41.373737',lon: '2.1678133'},
    //         ville: 'Barcelona'
    //     },
    //     {
    //         name: 'Macarena Club',
    //         data: macarena_club_2018,
    //         pos: {lat:'41.3794603',lon: '2.1746629'},
    //         ville: 'Barcelona'
    //     },
    //     {
    //         name: 'Moog Club',
    //         data: moog_club_2018,
    //         pos: {lat:'41.3780682',lon: '2.1728093'},
    //         ville: 'Barcelona'
    //     },
    //     {
    //         name: 'Nitsa',
    //         data: nitsa_2018,
    //         pos: {lat:'41.3743992',lon: '2.1673775'},
    //         ville: 'Barcelona'
    //     },
    //     {
    //         name: 'Pacha Barcelona',
    //         data: pacha_barcelona_2018,
    //         pos: {lat:'41.3857482',lon: '2.1948717'},
    //         ville: 'Barcelona'
    //     },
    //     {
    //         name: 'R33',
    //         data: r33_2018,
    //         pos: {lat:'41.37902',lon: '2.1726955'},
    //         ville: 'Barcelona'
    //     },
    //     {
    //         name: 'Razzmatazz',
    //         data: razzmatazz_2018,
    //         pos: {lat:'41.3977199',lon: '2.1889168'},
    //         ville: 'Barcelona'
    //     },
    //     {
    //         name: 'RED58',
    //         data: red58_2018,
    //         pos: {lat:'41.3892604',lon: '2.1614472'},
    //         ville: 'Barcelona'
    //     },
    //     {
    //         name: 'Switch Bar',
    //         data: switch_bar_2018,
    //         pos: {lat:'41.3991641',lon: '2.1569963'},
    //         ville: 'Barcelona'
    //     },
    //     {
    //         name: 'The Side Up',
    //         data: the_side_up_2018,
    //         pos: {lat:'41.374655',lon: '2.17116'},
    //         ville: 'Barcelona'
    //     },
    // ]

    // @observable clubs_Berlin = [
    //     {
    //         name: '://about blank',
    //         data: about_blank_2018,
    //         pos: {lat:'52.5025014',lon: '13.464188'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'ACUD MACHT NEU',
    //         data: acud_macht_neu_2018,
    //         pos: {lat:'52.53353',lon: '13.3986714'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Arkaoda Berlin',
    //         data: arkaoda_berlin_2018,
    //         pos: {lat:'52.4738267',lon: '13.4404815'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'AVA Club',
    //         data: ava_club_2018,
    //         pos: {lat:'52.5029495',lon: '13.4452266'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Berghain',
    //         data: berghain_2018,
    //         pos: {lat:'52.5106424',lon: '13.4399629'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Bohnengold',
    //         data: bohnengold_2018,
    //         pos: {lat:'52.497582',lon: '13.4219933'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Birgit & Bier',
    //         data: brigit_2018,
    //         pos: {lat:'52.4977622',lon: '13.447643'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Cassiopeia Club',
    //         data: cassiopeia_2018,
    //         pos: {lat:'52.5072723',lon: '13.4526039'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Chalet',
    //         data: chalet_2018,
    //         pos: {lat:'52.4969561',lon: '13.448616'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Club Der Visionaere',
    //         data: club_der_visionaere_2018,
    //         pos: {lat:'52.4967512',lon: '13.4492171'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Crack Bellmer',
    //         data: crack_bellmer_2018,
    //         pos: {lat:'52.5075972',lon: '13.4525908'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Der Weiße Hase',
    //         data: der_weiße_hase_2018,
    //         pos: {lat:'52.50755',lon: '13.4522374'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Else',
    //         data: else_2018,
    //         pos: {lat:'52.4949687',lon: '13.4600973'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Farbfernseher',
    //         data: farbfernseher_2018,
    //         pos: {lat:'52.4993833',lon: '13.4220562'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Golden Gate',
    //         data: golden_gate_2018,
    //         pos: {lat:'52.5159975',lon: '13.414595'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Gretchen',
    //         data: gretchen_2018,
    //         pos: {lat:'52.4960496',lon: '13.3871699'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Griessmuehle',
    //         data: griessmuehle_2018,
    //         pos: {lat:'52.4762678',lon: '13.4552658'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: '[Ipsə]',
    //         data: ipsə_2018,
    //         pos: {lat:'52.4977354',lon: '13.4495911'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Kater Blau',
    //         data: kater_blau_2018,
    //         pos: {lat:'52.5122218',lon: '13.4234087'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Mensh Meier',
    //         data: mensh_meier_2018,
    //         pos: {lat:'52.5350018',lon: '13.4501257'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Minimal bar',
    //         data: minimal_bar_2018,
    //         pos: {lat:'52.51643',lon: '13.4618348'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'OHM',
    //         data: ohm_2018,
    //         pos: {lat:'52.5111707',lon: '13.4207532'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Tresor',
    //         data: tresor_2018,
    //         pos: {lat:'52.5111707',lon: '13.4207532'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Paloma',
    //         data: paloma_2018,
    //         pos: {lat:'52.4997855',lon: '13.4181134'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Polygon Club',
    //         data: polygon_club_2018,
    //         pos: {lat:'52.5077201',lon: '13.4725522'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Promenaden Eck',
    //         data: promenaden_eck_2018,
    //         pos: {lat:'52.4756673',lon: '13.4199459'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Ritter Butzke',
    //         data: ritter_butzke_2018,
    //         pos: {lat:'52.5026717',lon: '13.4055995'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Wilde Renate',
    //         data: salon_zur_Widen_renate_2018,
    //         pos: {lat:'52.4974459',lon: '13.4629963'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Sisyphos',
    //         data: sisyphos_2018,
    //         pos: {lat:'52.4929519',lon: '13.4890514'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Solar',
    //         data: solar_2018,
    //         pos: {lat:'52.504308',lon: '13.3815553'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Suicide Club',
    //         data: suicide_club_2018,
    //         pos: {lat:'52.5072465',lon: '13.4490049'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Süss War Gestern',
    //         data: süss_war_gestern_2018,
    //         pos: {lat:'52.5085596',lon: '13.4588592'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Void Club',
    //         data: void_club_2018,
    //         pos: {lat:'52.5074312',lon: '13.4738208'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Watergate',
    //         data: watergate_2018,
    //         pos: {lat:'52.501608',lon: '13.4429163'},
    //         ville: 'Berlin'
    //     },
    //     {
    //         name: 'Zu Mir Oder Zu Dir',
    //         data: zu_mir_oder_zu_dir_2018,
    //         pos: {lat:'52.541973',lon: '13.4131406'},
    //         ville: 'Berlin'
    //     },
        
    // ]

    @observable citiesGenresSumup = [
        citiesGenresSumup_Paris,
        citiesGenresSumup_London,
        citiesGenresSumup_Amsterdam,
        citiesGenresSumup_Barcelona,
        citiesGenresSumup_Berlin
    ];

    @observable clubsStats = [
        {name: 'Paris', stats: clubsStats_Paris},
        {name: 'London', stats: clubsStats_London},
        {name: 'Amsterdam', stats: clubsStats_Amsterdam},
        {name: 'Barcelona', stats: clubsStats_Barcelona},
        {name: 'Berlin', stats: clubsStats_Berlin}
    ];

    @observable cityLimits = [
        {name: 'Paris', limits: parisLimits},
        {name: 'London', limits: londonLimits},
        {name: 'Amsterdam', limits: londonLimits},
        {name: 'Barcelona', limits: londonLimits},
        {name: 'Berlin', limits: londonLimits},
    ];

    @observable citiesInfos = [
        {
            name: 'Paris', 
            globalMapSubtitle: 'globalMapSubtitle Paris',
            globalMapText: 'globalMapText Paris',
            cityStoryComponent: <ParisText></ParisText>,
            initialPosition: [48.8606697, 2.3385351],
            zoomLevel: 11
        },
        {
            name: 'London', 
            globalMapSubtitle: 'globalMapSubtitle London',
            globalMapText: 'globalMapText London',
            cityStoryComponent: <LondonText></LondonText>,
            initialPosition: [51.509865, -0.118092],
            zoomLevel: 10.5
        },
        {
            name: 'Amsterdam', 
            globalMapSubtitle: 'globalMapSubtitle Amsterdam',
            globalMapText: 'globalMapText Amsterdam',
            cityStoryComponent: <AmsterdamText></AmsterdamText>,
            initialPosition: [52.3698332, 4.8769279],
            zoomLevel: 11.2
        },
        {
            name: 'Barcelona', 
            globalMapSubtitle: 'globalMapSubtitle Barcelona',
            globalMapText: 'globalMapText Barcelona',
            cityStoryComponent: <BarcelonaText></BarcelonaText>,
            initialPosition: [41.3948975, 2.1585557],
            zoomLevel: 12.2
        },
        {
            name: 'Berlin', 
            globalMapSubtitle: 'globalMapSubtitle Berlin',
            globalMapText: 'globalMapText Berlin',
            cityStoryComponent: <BerlinText></BerlinText>,
            initialPosition: [52.5069296, 13.4238601],
            zoomLevel: 11.5
        },
    ]

    @observable genresDetails = [
        { 
            name: 'House', 
            subGenres: [
                { name: 'Acid House', short: 'A.H.', video: {title: 'Phuture - Acid Trax', url: 'https://www.youtube.com/watch?v=PJJ5FxpVGUY'}, details: 'Like House music, Acid House appeared in Chicago in the end of the 80s. It spread through the British raves parties. The genre was welcomed but quickly diabolized by British newspapers due to its links to ecstasy. This bad press eventually led to a gain in popularity of the genre.' }, 
                { name: 'Deep House', short: 'D.H.', video: {title: 'Round Two - New Day', url: 'https://www.youtube.com/watch?v=mqNuNY0qaO4'}, details: 'Deep House has been invented by the same people who made House in Chicago in the 80s when they added to their work elements of Disco and Jazz.' },
                { name: 'Electro House', short: 'El.H.', video: {title: 'Benny Benassi - Satisfaction', url: 'https://www.youtube.com/watch?v=a0fkNdPiIL4'}, details: 'Electro House is a mix between Electro and House. It was created in the end of the 90s and gained mainstream popularity in the 2000s.' }, 
                { name: 'Euro House', short: 'Eu.H.', video: {title: 'Black Box - Ride on Time', url: 'https://www.youtube.com/watch?v=M0quXl_od3g'}, details: 'Euro House was created in the 80s and developed in the 90s in the USA and in the UK. Its main influenced are House music and Rap.'}, 
                { name: 'Garage House', short: 'G.H.', video: {title: 'Dance Advisory Commission - Free Your Mind', url: 'https://www.youtube.com/watch?v=-6A_NbbiRf4'}, details: 'Garage House was created in the beginning of the 80s in the USA at the same time as House. Its name comes from the club Paradise Garage where it was initially popularized in New York. Its main influences are Funk and Disco music.' }, 
                { name: 'Progressive House', short: 'P.H.', video: {title: 'Leftfield - Not Forgotten', url: 'https://www.youtube.com/watch?v=Pwvxtg1_zAs'}, details: 'Progressive House was developed in the 90s in the UK. It is Influenced by both American and European House. The genre is close from what will later appear as trance music.'},
                { name: 'Tech House', short: 'Te.H.', video: {title: 'Dave Spoon - At Night', url: 'https://www.youtube.com/watch?v=-4zVFbpwiog'}, details: 'Tech House is inbetween House and Techno music. It was initially developed in the 90s in the UK before spreading in Europe in the 2000s.' },
                { name: 'Tropical House', short: 'Tp.H.', video: {title: 'Kygo - Firestone', url: 'https://www.youtube.com/watch?v=9Sc-ir2UwGU'}, details: 'Tropical House was inspired by House and Deep House. It became popular in the middle of the 2010s thanks to festivals like Tomorrowland.' },
                { name: 'Tribal', short: 'Tb.H.', video: {title: 'Danny Tenaglia - Elements', url: 'https://www.youtube.com/watch?v=Z3Qdn11kVi4'}, details: 'Tribal House is a fusion of House and World music. It appeared in the 90s.' },
                { name: 'UK Garage', short: 'UK.G.', details: 'UK Garage appeared in the UK in the 90s. It’s inspired by Garage House, RnB and Jungle.', video: {title: 'Roy Davis Jr ft Peven Everett - Gabriel', url: 'https://www.youtube.com/watch?v=FwxpMIEZ9fg'} },
            ],
            video: {title: 'Mr Fingers - Can You Feel It', url: 'https://www.youtube.com/watch?v=UeiH9Mm0E5Y'},
            details: 'House was created in Chicago in the 80s. It became popular in New York and then in northern England, before spreading in all Europe.'
        },
        { 
            name: 'Techno', 
            subGenres: [
                // { name: 'Detroit Techno', details: 'Details for Minimal genre', video: {title: 'Cybotron - Alleys Of Your Mind', url: 'https://www.youtube.com/watch?v=kMHNhJJnve4'} }, 
                { name: 'Dub Techno', short: 'Du.T.', video: {title: 'Monolake - Cyan I', url: 'https://www.youtube.com/watch?v=7cwaEWVat2Y'}, details: 'Dub Techno is a subgenre of Techno inspired by Minimal Techno and Jamaican Dub Music. It was invented in the 90s by Basic Channel, a duo of Minimal Techno producers.' },
                { name: 'Minimal', short: 'Min.', video: {title: 'André Michelle - A1', url: 'https://www.youtube.com/watch?v=yo-7vWBUU_c'}, details: 'Minimal Techno was invented in the 90s in Detroit, even though it has only been called Minimal in the 2000s by German producers.' }, 
                { name: 'Deep Techno', short: 'Dee.T.', details: 'Sometimes called Dark Techno, Deep Techno is a subgenre of Minimal Techno born in Italy in the 2000s.', video: {title: 'Luigi Tozzi ‎– Deep Blue: Volume 2', url: 'https://www.youtube.com/watch?v=YD8XlG_1Tfs'} }
            ], 
            
            details: 'Techno music appeared in the USA at the same time as House music. It’s a general genre that can take its inspiration in Electro, New Wave, Soul, Funk etc. It also quickly became a very popular genre in England and Germany.',
            video: {title: 'Rhythim Is Rhythim – Strings of Life', url: 'https://www.youtube.com/watch?v=DM8j4AF06II'} 
        },
        { 
            name: 'Trance', 
            subGenres: [
                { name: 'Psy-Trance', short: 'Psy-T.', details: 'Psy-Trance was developed in Europe in the 90s. It is inspired by the Indian Goa-Trance. It is a subgenre of Trance characterized by a high speed tempo and more original samples.', video: {title: 'Orichalcum - Wicked Mille', url: 'https://www.youtube.com/watch?v=2KaJmmB-Gf4'} },
                { name: 'Hard Trance', short: 'H.T.', details: 'Hard Trance was born in Western Europe in the beginning of the 90s. It really developed in the UK in the beginning of the 2000s as a fusion of Hard House and trance.', video: {title: 'Tidy Trax - Hard Trance', url: 'https://www.youtube.com/watch?v=mNm-NagbzqM'} }, 
                { name: 'Progressive Trance', short: 'Pr.T.', details: 'Progressive Trance was born in the beginning of the 2000s, and is a subgenre of Psy-Trance but with a slower tempo. It uses progressive elements from Progressive House or Minimal Techno.', video: {title: 'Human Element - Feels Like Home', url: 'https://www.youtube.com/watch?v=ePSAztYwzhw'} },
            ], 
            
            details: 'Trance music was born in Germany in the beginning of the 90s. It’s a very diversified genre which finds its roots in Techno, Acid House or New Beat.',
            video: {title: 'Age Of Love - The Age Of Love', url: 'https://www.youtube.com/watch?v=SOsGNzYTUwg'} 
        },
        { 
            name: 'EDM', 
            subGenres: [
                { name: 'Breakbeat', short: 'BkB.', details: 'Breakbeat was invented in the USA and spread during the 90s. Its specific rhythm is inspired by Funk music. Hip Hop dancers are called “breakers” because of this specific rhythm.', video: {title: 'Harmony & Xtreme - Come on and Treat', url: 'https://www.youtube.com/watch?v=vLVRrHi5djE'} },
                { name: 'Drum n Bass', short: 'DnB.', details: 'Drum n Bass was born in the UK in the end of the 90s. It’s sometimes compared to Jazz for the diversity of sounds a listener can hear.', video: {title: 'Pendulum Hold Your Colour', url: 'https://www.youtube.com/watch?v=qtD1IpH5a5Q'} },
                { name: 'Jungle', short: 'Jgl.', details: 'Jungle appeared around 1993 in the UK. It was made popular through the London rave culture. It’s the ancestor of Drum n Bass but with more emphasis put on the rhythm complexity.', video: {title: 'Goldie - Inner City Life', url: 'https://www.youtube.com/watch?v=anQgfwdZUkE'} },
                { name: 'Dubstep', short: 'Dbp.', details: 'Dubstep was born in South London in the end of the 90s. Its inspired by UK Garage and 2-Step.', video: {title: 'Skream - Midnight Request Line', url: 'https://www.youtube.com/watch?v=p6WJYe6n-l8'} },
                // { name: 'Hardcore', short: 'Hc.', details: 'Details for Minimal genre', video: {title: 'Mescalinum United - We Have Arrived', url: 'https://www.youtube.com/watch?v=BL5xh-wt3Vc'} }, 
                { name: 'Happy Hardcore', short: 'H.Hc.', details: 'Happy Hardcore was born in UK in the end of the 90s. It uses elements of Hardcore Techno, Breakbeat, Italo House or Disco.', video: {title: 'Mr Brown - Turn It Out', url: 'https://www.youtube.com/watch?v=9ji7fj5M0qo'} }, 
                { name: 'Hard House', short: 'H.H.', details: 'Hard House was born in the UK in the end of the 90s. ', video: {title: 'KANDY & Olly James - Rumbla (JPR & Blackllax Remix)', url: 'https://www.youtube.com/watch?v=qoGyHyrndso'} }
            ], 
            
            details: 'Electronic Dance Music, or just Dance, in not really a music genre but rather all kind of clubbing music made for dancing.',
            video: {title: 'Krewella - Alive', url: 'https://www.youtube.com/watch?v=J-gYJBsln-w'} 
        },
        { 
            name: 'Ambient', 
            subGenres: [
                { name: 'Ambient House', short: 'Amb.H.', details: 'Ambient House was born in the UK in the 90s. It’s a fusion of Acid House and Ambient.', video: {title: 'The Future Sound Of London - Papua New Guinea', url: 'https://www.youtube.com/watch?v=wfWMv8Y1V5E'} },
                { name: 'Ambient Techno', short: 'Amb.T.', details: 'Ambient Techno was born in Europe in the 90s. It’s a fusion of Techno and Ambient. It has sometimes been called by producers “Intelligent Techno” to be distinguished from the rave culture.', video: {title: 'Wanderwelle - The Starry Night', url: 'https://www.youtube.com/watch?v=MdgXv-UhmX8'} },
                { name: 'Downtempo', short: 'Dwn.', details: 'Downtempo was popularized in Europe in the end of the 90s. It’s a subgenre of Ambient music. It has sometimes been compared with Trip Hop for its slow tempo and its tranquillity.', video: {title: 'Four Tet - Dreamer', url: 'https://www.youtube.com/watch?v=PvSD8zQzRCI'} },
                { name: 'IDM', short: 'IDM', details: 'Intelligent Dance Music was born in the beginning of the 90s in the USA and the UK. It was also called Ambient Techno until it became different enough from Techno.', video: {title: 'Boards of Canada - Everything You Do is a Balloon', url: 'https://www.youtube.com/watch?v=dQEmaj9C6ko'} },
            ], 
            
            details: 'Ambient Music is discrete but interesting. It was initially developed in the 70s but became popular in the 90s with subgenres like IDM, Ambient House or Ambient Techno.',
            video: {title: 'Aphex Twin - #3', url: 'https://www.youtube.com/watch?v=VAoTsU7JlSI'} 
        },
        { 
            name: 'RnB/Swing', 
            subGenres: [
                { name: 'Soul', short: 'Sl.', details: 'Soul was born in the 50s in the USA. The genre is in-between Rhythm and Blues and Gospel.', video: {title: 'The Detroit Emeralds - Do Me Right', url: 'https://www.youtube.com/watch?v=nB9VV0sPNPU'} },
                { name: 'Disco', short: 'Dsc.', details: 'Disco is a dancing genre born in the 70s in the USA. It’s inspired by Funk or Soul. It popularized as an alternative to Rock music.', video: {title: 'Madonna - Hung Up', url: 'https://www.youtube.com/watch?v=EDwb9jOVRtU'} },
                { name: 'Italo Disco', short: 'I.Dsc.', details: 'Italo Disco was born in the end of the 70s in Italy. It’s a subgenre of Disco and is influenced by Italo House or Eurodance. It gained popularity in the 80s in all Europe and in the USA.', video: {title: 'Alexander Robotnick - Problèmes D\'Amour', url: 'https://www.youtube.com/watch?v=jMN9_7tPFCY'} },
                { name: 'Nu Disco', short: 'N.Dsc.', details: 'Nu Disco appears in the beginning of the 2000s and is popularized in France and England as the rebirth of Disco. It brings together Disco music and House music.', video: {title: 'Bruno Mars - Treasure', url: 'https://www.youtube.com/watch?v=nPvuNsRccVw'} },
                { name: 'Funk', short: 'Fnk.', details: 'Funk was born in the 60s in the USA. It’s mostly influenced by Jazz and Soul.', video: {title: 'Carl Douglas - Kung Fu Fighting', url: 'https://www.youtube.com/watch?v=g75QS0nNldA'} },
            ], 
            
            details: 'RnB, also called contemporary RnB, was born in the 80s in the USA and finds its roots in Rhythm and Blues, Hip Hop, Soul and Pop.',
            video: {title: 'Alicia Keys - Fallin', url: 'https://www.youtube.com/watch?v=Urdlvw0SSEc'}
        },
        { 
            name: 'Experimental',
            subGenres: [
                { name: 'Noise', short: 'Ns.', details: 'Noise music experiments were already made in the 20s. The goal of the genre is to go against the usual concepts of music, putting aesthetic aside to focus on other things like structure, or meaning.', video: {title: 'Merzbow Boiler Room Tokyo Live Set', url: 'https://www.youtube.com/watch?v=fR_8gpJCT4I'} }
            ], 
            
            details: 'Experimental music gathers all types of music which experiments with technical tools, or new artistic methods that are different from the usual cultural standards.',
            video: {title: 'Halim El-Dabh - Wire Recorder Piece', url: 'https://www.youtube.com/watch?v=j_kbNSdRvgo'} 
        },
        { 
            name: 'Industrial',
            subGenres: [], 
            
            details: 'Industrial music for industrial people.',
            video: {title: 'Front Line Assembly - Mindphaser', url: 'https://www.youtube.com/watch?v=RWjBPIbJMzY'}
        },
        { 
            name: 'New Wave',
            subGenres: [
                { name: 'Electro', short: 'Elec.', details: 'Electro was born in the 80s as Electro-Funk or Electro Hip Hop. It’s based on the use of the specific rhythm box Roland TR-808.', video: {title: 'Kraftwerk - Das Model', url: 'https://www.youtube.com/watch?v=OQIYEPe6DWY'} },
                { name: 'Synth-Pop', short: 'Sy-P.', details: 'Synth-Pop appeared in the end of the 70s in Europe and Japan. It’s a form of Rock or Pop influenced by electronic genres like House, Detroit Techno or Trance music.', video: {title: 'Thompson Twins - The Gap', url: 'https://www.youtube.com/watch?v=0SEwy1as78E'} }
            ], 
            
            details: 'New Wave became popular in the 80s in the UK and the USA. It’s a mix between Punk music and Electronic music.',
            video: {title: 'New Order - Bizarre Love Triangle', url: 'https://www.youtube.com/watch?v=7uEBuqkkQRk'}
        },
        { 
            name: 'Hip Hop',
            subGenres: [
                { name: 'Grime', short: 'Gr.', details: 'Grime appeared in the 2000s in the UK. It’s a subgenre of Hip Hop influenced by UK Garage, Drum n Bass or Dancehall.', video: {title: 'Skepta - Konnichiwa', url: 'https://www.youtube.com/watch?v=XoQ8e0S1KBo'} },
                { name: 'Trap', short: 'Tr.', details: 'Trap music was born in the beginning of the 90s in the USA. In the 2010s, the genre became popular again thanks to producers integrating it with EDM.', video: {title: 'Skepta - Konnichiwa', url: 'https://www.youtube.com/watch?v=E1u9u7mq9Ck'} },
                { name: 'Favela Funk', short: 'Fa.Fu.', details: 'Favela Funk was born in the 80s in the favelas of Rio de Janeiro.', video: {title: 'M.I.A. - Bucky Done Gun', url: 'https://www.youtube.com/watch?v=VNJ96imMskk'} },
            ], 
            
            details: 'Hip Hop is a cultural and musical movement which appeared in the USA in the 70s. It’s a genre influenced by Funk and Soul which is often accompanied with rap.',
            video: {title: 'Afrika Bambaataa - Planet Rock', url: 'https://www.youtube.com/watch?v=Wg2SW1oqSAk'}
        }
    ];

    @computed get genresNames() {
        const genresTmp = [];
        this.genresDetails.forEach(genre => {
            genresTmp.push(genre.name);
            if (genre.subGenres && genre.subGenres.length > 0) {
                genre.subGenres.forEach(subGenre => {
                    genresTmp.push(subGenre.name);
                });
            }
        });
        return genresTmp;
    }

    @computed get genresCategories() {
        const genresTmp = [];
        this.genresDetails.forEach(genre => {
            let categorie = [];
            categorie.push(genre.name);
            if (genre.subGenres && genre.subGenres.length > 0) {
                genre.subGenres.forEach(subGenre => {
                    categorie.push(subGenre.name);
                });
            }
            genresTmp.push(categorie);
        });
        return genresTmp;
    }

    getSimilarGenre = (genreName) => {
        let otherGenre = '';
        this.genresDetails.forEach(genre => {
            if (genre.name === genreName) {
                if (genre.subGenres && genre.subGenres.length > 0) {
                    let randomIndex = Math.trunc(genre.subGenres.length * Math.random() - 0.01);
                    otherGenre = genre.subGenres[randomIndex].name;
                } else {
                    otherGenre = genre.name;
                }
                return 
            } else {
                if (genre.subGenres && genre.subGenres.length > 0) {
                    genre.subGenres.forEach(subGenre => {
                        if (subGenre.name === genreName) {
                            let randomIndex = Math.trunc(genre.subGenres.length * Math.random() - 0.01);
                            otherGenre = genre.subGenres[randomIndex].name;
                        }
                    })
                }
            }
        });
        return otherGenre;
    }

    @action handleAvaliableGenresInMap = (e) => {
        let newActiveGenresInMap = [];
        if (e.target.value.length > 0) {
            this.genresNames.map(genre => {
                if (e.target.value.indexOf(genre) !== -1) {
                    newActiveGenresInMap.push(genre);
                }
            });
        }
        this.activeGenresInMap = newActiveGenresInMap;
    }

    @observable currentGenreInTree = 'House';
    @computed get activeGenresInTree() {
        console.log('compute activeGenresInTree')
        const activeGenres = [];
        this.genresDetails.forEach(genre => {
            if (genre.name === this.currentGenreInTree) {
                activeGenres.push(this.currentGenreInTree);
                // if (genre.subGenres && genre.subGenres.length > 0) {
                //     genre.subGenres.forEach(subGenre => {
                //         activeGenres.push(subGenre.name);
                //     });
                // }
            } else {
                if (genre.subGenres && genre.subGenres.length > 0) {
                    genre.subGenres.forEach(subGenre => {
                        if (subGenre.name === this.currentGenreInTree) {
                            activeGenres.push(subGenre.name);
                        }
                    });
                }
            }
        });
        return activeGenres;
    }

    @action setActiveGenre = (genreName) => {
        this.currentGenreInTree = genreName;
    }

    @action getGenreDetailsFromName = (genreName) => {
        let genreDetails = {};
        this.genresDetails.forEach(genre => {
            if (genre.name === genreName) {
                genreDetails = genre;
            } else {
                if (genre.subGenres && genre.subGenres.length > 0) {
                    genre.subGenres.forEach(subGenre => {
                        if (subGenre.name === genreName) {
                            genreDetails = subGenre;
                        }
                    })
                }
            }
        });
        return genreDetails;
    }

    @observable activeGenresInMap = ['House', 'Techno', 'Disco'];
    @observable activeClubInMap = '';

    @action setActiveClub = (clubName) => {
        this.activeClubInMap = clubName;
    }

    getColorFromGenre = (genre) => {
        let localGenre = genre;

        switch (genre) {
            case 'breaks': localGenre = 'breakbeat'; break;
            case 'dub': localGenre = 'reggae'; break;
            case 'bass_music': localGenre = 'drum_n_bass'; break;
            case 'ebm': localGenre = 'new_wave'; break;
            case 'broken_beat': localGenre = 'uk_garage'; break;
            case 'instrumental': localGenre = 'ambient'; break;
            case 'rnb/swing': localGenre = 'rnb'; break;
            case 'drone': localGenre = 'experimental'; break;
            case 'trip_hop': localGenre = 'breakbeat'; break;
            case 'boogie': localGenre = 'rnb'; break;
            case 'gangsta': localGenre = 'hip_hop'; break;
            case 'ghetto': localGenre = 'hip_hop'; break;
            case 'future_jazz': localGenre = 'house'; break;
            case 'nu_jazz': localGenre = 'house'; break;
            case 'dancehall': localGenre = 'rnb'; break;
            case 'hardcore_hip-hop': localGenre = 'hip_hop'; break;
            case 'tribal_house': localGenre = 'tribal'; break;
            case 'glitch': localGenre = 'experimental'; break;
            case 'afrobeat': localGenre = 'rnb'; break;
            case 'darkwave': localGenre = 'new_wave'; break;
            case 'jazzy_hip-hop': localGenre = 'hip_hop'; break;
            case 'goa_trance': localGenre = 'psy-trance'; break;
            case 'dark_ambient': localGenre = 'ambient'; break;
            case 'new_age': localGenre = 'ambient'; break;
            case 'italodance': localGenre = 'italo-disco'; break;
            case 'gabber': localGenre = 'techno'; break;
            case 'pop_rap': localGenre = 'hip_hop'; break;
            case 'rythmic_noise': localGenre = 'noise'; break;
            case 'rhythm_&_blues': localGenre = 'rnb'; break;
            case 'jazz-funk': localGenre = 'funk'; break;
            case 'italo_house': localGenre = 'house'; break;
            case 'neo_soul': localGenre = 'soul'; break;
            case 'post-punk': localGenre = 'new_wave'; break;
            case 'hip-house': localGenre = 'house'; break;
            case 'chiptune': localGenre = 'noise'; break;
            case 'hard_techno': localGenre = 'techno'; break;
            case 'new_beat': localGenre = 'acid_house'; break;
            case 'hi_nrg': localGenre = 'disco'; break;
            case 'witch_house': localGenre = 'house'; break;
            case 'soul-jazz': localGenre = 'soul'; break;
            case 'eurobeat': localGenre = 'italo-disco'; break;
            case 'avant-garde_jazz': localGenre = 'jazz'; break;
            case 'fusion': localGenre = 'jazz'; break;
            case 'latin_jazz': localGenre = 'jazz'; break;
            case 'roots_reggae': localGenre = 'reggae'; break;
            case 'hardstyle': localGenre = 'techno'; break;
            case 'uk_funky': localGenre = 'funk'; break;
            case 'bop': localGenre = 'jazz'; break;
            case 'chillwave': localGenre = 'tropical_house'; break;
            case 'tech_trance': localGenre = 'trance'; break;
            case 'juke': localGenre = 'house'; break;
            case 'horrorcore': localGenre = 'hip_hop'; break;
            case 'screw': localGenre = 'hip_hop'; break;
            case 'europop': localGenre = 'italo-disco'; break;
            case 'speedcore': localGenre = 'techno'; break;
            case 'contemporary_jazz': localGenre = 'jazz'; break;
            case 'ghetto_house': localGenre = 'house'; break;
            case 'ragga': localGenre = 'reggae'; break;
            case 'g-funk': localGenre = 'funk'; break;
            case 'eurodance': localGenre = 'italo-disco'; break;
            case 'breakcore': localGenre = 'techno'; break;
            case 'neo_trance': localGenre = 'trance'; break;
            case 'illbient': localGenre = 'ambient'; break;
            case 'calypso': localGenre = 'reggae'; break;
            case 'free_improvisation': localGenre = 'experimental'; break;
            case 'minneapolis_sound': localGenre = 'funk'; break;
            case 'synthwave': localGenre = 'new_wave'; break;
            case 'contemporary_r&b': localGenre = 'rnb'; break;
            case 'bassline': localGenre = 'drum_n_bass'; break;
            case 'bass_band': localGenre = 'drum_n_bass'; break;
            case 'acid_jazz': localGenre = 'jazz'; break;
            case 'bossa_nova': localGenre = 'jazz'; break;
            case 'no_wave': localGenre = 'new_wave'; break;
            case 'musique_concrète': localGenre = 'experimental'; break;
            case 'afro-cuban_jazz': localGenre = 'jazz'; break;
            case 'coldwave': localGenre = 'new_wave'; break;
            case 'makina': localGenre = 'acid_house'; break;
            case 'field_recording': localGenre = 'experimental'; break;
            case 'thug_rap': localGenre = 'hip_hop'; break;
            case 'speed_garage': localGenre = 'uk_garage'; break;
            case 'vaporwave': localGenre = 'house'; break;
            case 'bossanova': localGenre = 'jazz'; break;
            case 'kwaito': localGenre = 'house'; break;
            case 'highlife': localGenre = 'hip_hop'; break;
            case 'hiplife': localGenre = 'hip_hop'; break;
            case 'reggae-pop': localGenre = 'reggae'; break;
            case 'jazzdance': localGenre = 'jazz'; break;
            case 'big_beat': localGenre = 'breakbeats'; break;
            default: localGenre = genre;
            // case 'thug_rap': localGenre = 'hip_hop';
        }

        if (genre.includes('rock')) {
            localGenre = 'rock'
        }
        if (genre.includes('pop')) {
            localGenre = 'pop'
        }
        if (genre.includes('metal')) {
            localGenre = 'metal'
        }

        switch (localGenre) {
            //  COLOR 1 IS MAIN COLOR, COLOR 2 IS LIGHTER VERSION AND COLOR 3 IS TEXT COLOR
            case 'house': return { col1: '#EC148C', col2: '#FCCFE9', col3: 'white' };
            case 'techno': return { col1: '#093F9B', col2: '#D4F5FF', col3: 'white' };
            case 'downtempo': return { col1: '#3CE8C8', col2: '#CCF2EB', col3: 'white' };
            case 'tech_house': return { col1: '#C82D32', col2: '#EBB2B4', col3: 'white' };
            case 'minimal': return { col1: '#84A0A5', col2: '#C8D4D7', col3: 'white' };
            case 'deep_house': return { col1: '#E18081', col2: '#F1C5C5', col3: 'white' };
            case 'garage_house': return { col1: '#C90A63', col2: '#E68FB8', col3: 'white' };
            case 'electro': return { col1: '#4392F1', col2: '#98C3F7', col3: 'white' };
            case 'dub_techno': return { col1: '#5C9CBA', col2: '#B9D4E1', col3: 'white' };
            case 'acid': return { col1: '#F9604F', col2: '#FBA89F', col3: 'white' };
            case 'experimental': return { col1: '#01B8AA', col2: '#B9EBE7', col3: 'white' };
            case 'disco': return { col1: '#FFBF00', col2: '#FFE7A2', col3: 'white' };
            case 'acid_house': return { col1: '#FA7C6F', col2: '#FBA89F', col3: 'white' };
            case 'funk': return { col1: '#FF9900', col2: '#FFD08B', col3: 'white' };
            case 'dubstep': return { col1: '#9196A0', col2: '#DADCDF', col3: 'white' };
            case 'abstract': return { col1: '#6EEAA4', col2: '#BDF5D5', col3: 'white' };
            case 'trance': return { col1: '#8ECE1E', col2: '#D6EFAA', col3: 'white' };
            case 'hardcore': return { col1: '#91A4C1', col2: '#D7DDE8', col3: 'white' };
            case 'drum_n_bass': return { col1: '#AF7E7E', col2: '#DAC4C4', col3: 'white' };
            case 'breakbeat': return { col1: '#E592B8', col2: '#F3CDDE', col3: 'white' };
            case 'ambient': return { col1: '#9AB524', col2: '#D7DEB8', col3: 'white' };
            case 'euro_house': return { col1: '#7F49C1', col2: '#C4ACE2', col3: 'white' };
            case 'electro_house': return { col1: '#5F37E5', col2: '#B6A4F3', col3: 'white' };
            case 'uk_garage': return { col1: '#F26FEB', col2: '#FFDCFD', col3: 'white' };
            case 'tropical_house': return { col1: '#FFCE30', col2: '#FFE8A0', col3: 'white' };
            case 'reggaeton': return { col1: '#F9E84A', col2: '#FCF4AC', col3: 'white' };
            case 'latin': return { col1: '#FFC285', col2: '#FFDDBC', col3: 'white' };
            case 'country': return { col1: '#EFA667', col2: '#F6CEAC', col3: 'white' };
            case 'dance-pop': return { col1: '#F89FEA', col2: '#FCD6F6', col3: 'white' };
            case 'synth-pop': return { col1: '#ED5EA6', col2: '#F5A7CE', col3: 'white' };
            case 'leftfield': return { col1: '#D88CD3', col2: '#EDCAEB', col3: 'white' };
            case 'tribal': return { col1: '#F9A43B', col2: '#FBCD94', col3: 'white' };
            case 'idm': return { col1: '#70C438', col2: '#D5E4CC', col3: 'white' };
            case 'industrial': return { col1: '#B7B7B7', col2: '#E7E7E7', col3: 'white' };
            case 'progressive_house': return { col1: '#F2B100', col2: '#FAF0B5', col3: 'white' };
            case 'punk': return { col1: '#B775FF', col2: '#DEC0FF', col3: 'white' };
            case 'psy-trance': return { col1: '#CAD100', col2: '#FCFFB7', col3: 'white' };
            case 'minimal_techno': return { col1: '#9EB4FF', col2: '#CAD6FF', col3: 'white' };
            case 'edm': return { col1: '#5D99AD', col2: '#B5D0D9', col3: 'white' };
            case 'soul': return { col1: '#E8736A', col2: '#F6CCC8', col3: 'white' };
            case 'rnb': return { col1: '#FF6919', col2: '#FFBA96', col3: 'white' };
            case 'ambient_techno': return { col1: '#6EDB43', col2: '#CBEBBF', col3: 'white' };
            case 'ambient_house': return { col1: '#DBB727', col2: '#EEE5BF', col3: 'white' };
            case 'deep_techno': return { col1: '#197BBB', col2: '#8CBDDD', col3: 'white' };
            case 'hard_trance': return { col1: '#53C444', col2: '#A1DE99', col3: 'white' };
            case 'progressive_trance': return { col1: '#DBC100', col2: '#E5E85C', col3: 'white' };
            case 'jungle': return { col1: '#DBD07D', col2: '#E8E1AC', col3: 'white' };
            case 'happy_hardcore': return { col1: '#6CBEC9', col2: '#AEDBE1', col3: 'white' };
            case 'progressive_trance': return { col1: '#DBC100', col2: '#E5E85C', col3: 'white' };
            case 'hard_house': return { col1: '#FF8484', col2: '#E8ABAB', col3: 'white' };
            case 'noise': return { col1: '#0199B7', col2: '#74C7D7', col3: 'white' };
            case 'new_wave': return { col1: '#4A66D6', col2: '#9CABE8', col3: 'white' };
            case 'hip_hop': return { col1: '#91D8CA', col2: '#CDEDE6', col3: 'white' };
            case 'grime': return { col1: '#4BEDCA', col2: '#ADF6E6', col3: 'white' };
            case 'trap': return { col1: '#74A59A', col2: '#B3CDC7', col3: 'white' };
            case 'favela_funk': return { col1: '#98CC74', col2: '#BDDEA6', col3: 'white' };
            case 'italo_disco': return { col1: '#FF8235', col2: '#FFAF7E', col3: 'white' };
            case 'nu_disco': return { col1: '#E76C40', col2: '#F3B59F', col3: 'white' };

            //  MAYBE ADD TO LIST
            case 'reggae': return { col1: '#88BA00', col2: '#BED973', col3: 'white' };
            case 'jazz': return { col1: '#F24000', col2: '#F9A88B', col3: 'white' };
            case 'rock': return { col1: '#C67171', col2: '#DFB1B1', col3: 'white' };
            case 'pop': return { col1: '#FF00AA', col2: '#FF8BD8', col3: 'white' };
            case 'metal': return { col1: '#59006D', col2: '#B38BBC', col3: 'white' };
            default: return { col1: 'transparent', col2: 'transparent', col3: 'white' };
        }
    }
}

const singleton = new DataStore();
export default singleton;