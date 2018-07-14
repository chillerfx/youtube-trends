$(() => { 
    $("#countrySelect").on('change', () => {
        const country = $("#countrySelect").val()
        const currentUrl = window.location.href.split('?')[0]
        window.location.assign(`${currentUrl}?country=${country}`) 
    })
});