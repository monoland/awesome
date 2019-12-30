import Vue from 'vue';

import { 
    ClickOutside, 
    Intersect,
    Resize, 
    Ripple, 
    Scroll, 
    Touch 
} from 'vuetify/lib/directives';

import { 
    VDialogBottomTransition,
    VExpandTransition, 
    VFadeTransition,
    VScaleTransition
} from 'vuetify/lib/components/transitions';

import Vuetify, {
    VApp,
    VAppBar,
    VAppBarNavIcon,
    VAvatar,
    VBtn,
    VCard,
    VCardText,
    VCardActions,
    VContainer,
    VContent,
    VCol,
    VDataTable,
    VDialog,
    VDivider,
    VFooter,
    VHover,
    VIcon,
    VImg,
    VList,
    VListItem,
    VListItemAction,
    VListItemAvatar,
    VListItemContent,
    VListItemIcon,
    VListItemSubtitle,
    VListItemTitle,
    VMenu,
    VNavigationDrawer,
    VOverlay,
    VProgressCircular,
    VProgressLinear,
    VRow,
    VSelect,
    VSheet,
    VSpacer,
    VSnackbar,
    VSubheader,
    VSwitch,
    VTextField,
    VToolbar,
    VToolbarTitle,
    VTooltip

} from 'vuetify/lib';

Vue.use(Vuetify, {
    components: {
        VApp,
        VAppBar,
        VAppBarNavIcon,
        VAvatar,
        VBtn,
        VCard,
        VCardText,
        VCardActions,
        VContainer,
        VContent,
        VCol,
        VDataTable,
        VDialog,
        VDialogBottomTransition,
        VDivider,
        VExpandTransition,
        VFadeTransition,
        VFooter,
        VHover,
        VIcon,
        VImg,
        VList,
        VListItem,
        VListItemAction,
        VListItemAvatar,
        VListItemContent,
        VListItemIcon,
        VListItemSubtitle,
        VListItemTitle,
        VMenu,
        VNavigationDrawer,
        VOverlay,
        VProgressCircular,
        VProgressLinear,
        VRow,
        VSelect,
        VSheet,
        VScaleTransition,
        VSpacer,
        VSnackbar,
        VSubheader,
        VSwitch,
        VTextField,
        VToolbar,
        VToolbarTitle,
        VTooltip
    },

    directives: {
        ClickOutside, 
        Intersect,
        Resize, 
        Ripple, 
        Scroll, 
        Touch 
    }
});

export default new Vuetify({
    icons: {
        iconfont: 'md',
    }
});