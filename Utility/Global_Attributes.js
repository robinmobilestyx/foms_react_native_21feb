import React, { Component } from "react";
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from "react-native-config";

// const baseAPiUrl = 'https://mdei.info/police_app_v1/api/'

const baseAPiUrl = Config.API_URL;

export default class Global_Attributes extends Component {
    
    static User = "TempUser";
    static Pass = "TempUserPass@1234";
    static loading = false;
    static let='';
    static log='';
    static deviceID ='';
    static pinSuccess = '';
    static warningtick = `${baseAPiUrl}cases/submit_warning`;
    static updateApiUrl = `${baseAPiUrl}ticket_bucket/update_tickets_bucket`;
    static ponTicketApiUrl = `${baseAPiUrl}ticket_bucket/get_next_ticket_no`;
    static summon3TicketApiUrl = `${baseAPiUrl}Summon3_Ticket_buckets/get_next_summon3_ticket_no/`;
    static submitPon = `${baseAPiUrl}cases/submit_form`;
    static submitsummon3 = `${baseAPiUrl}Cases/summon3_submit_form/`;
    static userTickets = `${baseAPiUrl}ticket_bucket/get_user_tickets`;
    static faq_data = `${baseAPiUrl}faq/help_data`;
    static ponReports = `${baseAPiUrl}ticket/get_pon_ticket_details/PON`;
    static warning = `${baseAPiUrl}ticket/get_pon_ticket_details/WARNING`;
    static releaseForm = `${baseAPiUrl}Release_form/get_list`;
    static summon = `${baseAPiUrl}Ticket/get_summon3_ticket_details/`;
    static splashUrl = `${baseAPiUrl}others/version_no`;
    static numberVerify = `${baseAPiUrl}login/login_proccess`;
    static CreatePinAndLogin = `${baseAPiUrl}login/pin_proccess`;
    static enterPin = `${baseAPiUrl}login/pin_proccess`;
    static enterOtp = `${baseAPiUrl}login/login_proccess`;
    static uploadNotes = `${baseAPiUrl}cases/submit_officer_notes`;
    static CancelRoadSide = `${baseAPiUrl}ticket/change_ticket_status`;
    static laws = `${baseAPiUrl}laws/law`;
    static profile = `${baseAPiUrl}users/update_users_info`;
    static nearValues = `${baseAPiUrl}cases/get_near_values`;
    static prsLocation = `${baseAPiUrl}cases/get_previous_location`;
    static RSUploadNotes = `${baseAPiUrl}cases/submit_officer_notes`;
    static RSCancelRoadSide = `${baseAPiUrl}ticket/change_ticket_status`;
    static RSGetTicketDetails = `${baseAPiUrl}ticket/get_pon_ticket_details/PON`;
    static RSSummonUploadNotes = `${baseAPiUrl}Cases/summon3_officer_notes`;
    static RSSummonCancelRoadSide = `${baseAPiUrl}ticket/change_ticket_status`;
    static Scrolling = true;
    static fixfontstyle='Roboto';


    static PonOneBean = {

        date: new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate(),

        time: new Date(),
        locationCode: "",
        offenceNumber: "",
        formatted: "",
        family: "",
        given: "",
        initials: "",
        street: "",
        muncipality: "",
        po: "",
        province: "",
        postl: "",
        lisenceNumber: "",
        juris: "ON",
        dob: "",
        gender: 'M',
        motorInvolved: false,
        collision: false,
        withnesses: false,
        atOne: "",
        atTwo: "",
        atThree: "",
        state: "",
        pincode: "",
        manualLocation: "",
        didCommit: "",
        contrary: "",
        sect: "",
        plateNumber: "",
        commercial: false,
        cvor: false,
        nsc: false,
        code: "",
        fine: "",
        payable: "",
        covrNumer: "",
        km_over: "",
        schedule: "",
        communitysafeZone: "",
        constZOne: "",
        speedLimit: "",
        chargedSpeed: "",
        speedActual: "",
        speedingCb: false,
        schld2Rb: "",
        issuedDate: "",
        act_title: "",
        parent_law: "",
        lat: "",
        long: "",
        officerName: ""
    }

    static Name = "";
    static TicketNumber = "";
    static PonPdf = "";
    static OfficerPonPdf = "";
    static CourtPonPdf = "";
    static Date = "";
    static TicketType = "";
    static TicketId = "";
    static HoldStatus = "";
    static TicketStatus = "";

    static myticketDetails = {
        total_tickets_used: null,
        total_tickets: null,
        warning_tickets_count: null,
    }

    static PonLaws = {
        parent_law: '',
        parent_law_id: '',
        act_length: '',
        act_title: '',
        act_no: '',
        set_fine: '',
        total_payable: '',
        act_des: '',
        demerits: '',
        ATNEARvalues: '',
    }

    static gpsAddress = {
        gpsCity: "",
        gpsDistrict: "",
        gpsState: "",
        gpsPincode: ""
    }

    static myAccountsdetails = {
        officer_name: '',
        officer_no: '',
    }

    static LawSection = {
        acttitle: '',
        actno: '',
        actdes: '',
        actsetfine: '',
        actpayble: '',
        actdemerits: '',
    }

    static LawSection_ActTitle = {
        acttitle: '',
        actno: '',
        actdes: '',
        actsetfine: '',
        actpayble: '',
        actdemerits: '',
    }

}