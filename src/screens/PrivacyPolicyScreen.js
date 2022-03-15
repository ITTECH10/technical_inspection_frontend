import React from 'react'
import { Grid, Typography, Paper, Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alerts from '../components/UI/Alerts'
import { useHistory } from 'react-router'
import { useData } from '../contexts/DataContext'
import { withNamespaces } from 'react-i18next'
import Page from '../components/Page'

const useStyles = makeStyles(theme => ({
    mainContainer: {
    },
    privacyTitle: {
        marginBottom: 30
    },
    visibleItem: {
        // position: 'relative',
        // top: 64
    },
    paperRoot: {
        padding: 20
    },
    privacyInfoIntro: {
        color: '#666',
        marginBottom: 30
    },
    privacyHeadingOne: {},
    privacyActionBtns: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10
    }
}))

const PrivacyPolicyScreen = ({ t }) => {
    const classes = useStyles()
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [alertMsg, setAlertMsg] = React.useState('')
    const history = useHistory()
    const { logout, acceptPrivacyPolicy, user } = useData()

    const navigateTimeout = React.useRef()

    React.useEffect(() => {
        return () => {
            clearTimeout(navigateTimeout.current)
        }
    }, [navigateTimeout])

    const handlePrivacyAcception = () => {
        acceptPrivacyPolicy(user._id)
        setAlertOpen(true)
        setAlertMsg("Vielen Dank, dass Sie unsere Datenschutzbestimmungen gelesen und akzeptiert haben!")

        navigateTimeout.current = setTimeout(() => {
            history.push('/changePassword')
            history.go(0)
        }, 3000)
    }

    const handlePrivacyDissagrement = () => {
        logout(history)
    }

    return (
        <Page title="SE Carmanagement | Datenschutzbestimmungen">
            <Alerts message={t('AlertPrivacyPolicyAccepted')} open={alertOpen} handleOpening={setAlertOpen} severity={alertMsg.startsWith('Thank you') ? 'success' : 'error'} />
            <Grid container className={classes.mainContainer}>
                <Grid sm={3} item />
                <Grid sm={6} item className={classes.visibleItem}>
                    <Paper className={classes.paperRoot} elevation={1}>
                        '''Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO), ist:'''
					''''''
					'''Schneider & Eberhart Carmanagement GbR'''
					'''Geltinger Str. 23'''
					'''85652 Pliening'''
					''''''
					'''Vertreten durch:'''
					'''Maria Schneider und Wolfgang Eberhart'''
					''''''
					'''Ihre Betroffenenrechte'''
					'''Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten können Sie jederzeit folgende Rechte ausüben:'''
					''''''
					'''Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung (Art. 15 DSGVO),'''
					'''Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO),'''
					'''Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),'''
					'''Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher Pflichten noch nicht löschen dürfen (Art. 18 DSGVO),'''
					'''Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO) und'''
					'''Datenübertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt haben oder einen Vertrag mit uns abgeschlossen haben (Art. 20 DSGVO).'''
					'''Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen.'''
					''''''
					'''Sie können sich jederzeit mit einer Beschwerde an eine Aufsichtsbehörde wenden, z. B. an die zuständige Aufsichtsbehörde des Bundeslands Ihres Wohnsitzes oder an die für uns als verantwortliche Stelle zuständige Behörde.'''
					''''''
					'''Eine Liste der Aufsichtsbehörden (für den nichtöffentlichen Bereich) mit Anschrift finden Sie unter: https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html.'''
					''''''
					'''Erfassung allgemeiner Informationen beim Besuch unserer Website'''
					'''Art und Zweck der Verarbeitung:'''
					'''Wenn Sie auf unsere Website zugreifen, d.h., wenn Sie sich nicht registrieren oder anderweitig Informationen übermitteln, werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers, Ihre IP-Adresse und ähnliches.'''
					''''''
					'''Sie werden insbesondere zu folgenden Zwecken verarbeitet:'''
					''''''
					'''Sicherstellung eines problemlosen Verbindungsaufbaus der Website,'''
					'''Sicherstellung einer reibungslosen Nutzung unserer Website,'''
					'''Auswertung der Systemsicherheit und -stabilität sowie'''
					'''zur Optimierung unserer Website.'''
					'''Wir verwenden Ihre Daten nicht, um Rückschlüsse auf Ihre Person zu ziehen. Informationen dieser Art werden von uns ggfs. anonymisiert statistisch ausgewertet, um unseren Internetauftritt und die dahinterstehende Technik zu optimieren.'''
					''''''
					'''Rechtsgrundlage und berechtigtes Interesse:'''
					'''Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an der Verbesserung der Stabilität und Funktionalität unserer Website.'''
					''''''
					'''Empfänger:'''
					'''Empfänger der Daten sind ggf. technische Dienstleister, die für den Betrieb und die Wartung unserer Webseite als Auftragsverarbeiter tätig werden.'''
					''''''
					'''Drittlandtransfer:'''
					'''Die erhobenen Daten werden ggfs. in folgende Drittländer übertragen:'''
					''''''
					'''Nein'''
					''''''
					'''Folgende Datenschutzgarantien liegen vor:'''
					''''''
					'''Speicherdauer:'''
					'''Die Daten werden gelöscht, sobald diese für den Zweck der Erhebung nicht mehr erforderlich sind. Dies ist für die Daten, die der Bereitstellung der Website dienen, grundsätzlich der Fall, wenn die jeweilige Sitzung beendet ist.'''
					''''''
					'''Im Falle der Speicherung der Daten in Logfiles ist dies nach spätestens 14 Tagen der Fall. Eine darüberhinausgehende Speicherung ist möglich. In diesem Fall werden die IP-Adressen der Nutzer anonymisiert, sodass eine Zuordnung des aufrufenden Clients nicht mehr möglich ist.'''
					''''''
					'''Bereitstellung vorgeschrieben oder erforderlich:'''
					'''Die Bereitstellung der vorgenannten personenbezogenen Daten ist weder gesetzlich noch vertraglich vorgeschrieben. Ohne die IP-Adresse ist jedoch der Dienst und die Funktionsfähigkeit unserer Website nicht gewährleistet. Zudem können einzelne Dienste und Services nicht verfügbar oder eingeschränkt sein. Aus diesem Grund ist ein Widerspruch ausgeschlossen.'''
					''''''
					'''Cookies'''
					'''Wie viele andere Webseiten verwenden wir auch so genannte „Cookies“. Bei Cookies handelt es sich um kleine Textdateien, die auf Ihrem Endgerät (Laptop, Tablet, Smartphone o.ä.) gespeichert werden, wenn Sie unsere Webseite besuchen.'''
					''''''
					'''Sie können Sie einzelne Cookies oder den gesamten Cookie-Bestand löschen. Darüber hinaus erhalten Sie Informationen und Anleitungen, wie diese Cookies gelöscht oder deren Speicherung vorab blockiert werden können. Je nach Anbieter Ihres Browsers finden Sie die notwendigen Informationen unter den nachfolgenden Links:'''
					''''''
					'''Mozilla Firefox: https://support.mozilla.org/de/kb/cookies-loeschen-daten-von-websites-entfernen'''
					'''Internet Explorer: https://support.microsoft.com/de-de/help/17442/windows-internet-explorer-delete-manage-cookies'''
					'''Google Chrome: https://support.google.com/accounts/answer/61416?hl=de'''
					'''Opera: http://www.opera.com/de/help'''
					'''Safari: https://support.apple.com/kb/PH17191?locale=de_DE&viewlocale=de_DE'''
					'''Speicherdauer und eingesetzte Cookies:'''
					'''Soweit Sie uns durch Ihre Browsereinstellungen oder Zustimmung die Verwendung von Cookies erlauben, können folgende Cookies auf unseren Webseiten zum Einsatz kommen:'''
					''''''
					'''1 Tag'''
					''''''
					'''Technisch notwendige Cookies'''
					'''Art und Zweck der Verarbeitung:'''
					'''Wir setzen Cookies ein, um unsere Website nutzerfreundlicher zu gestalten. Einige Elemente unserer Internetseite erfordern es, dass der aufrufende Browser auch nach einem Seitenwechsel identifiziert werden kann.'''
					''''''
					'''Der Zweck der Verwendung technisch notwendiger Cookies ist, die Nutzung von Websites für die Nutzer zu vereinfachen. Einige Funktionen unserer Internetseite können ohne den Einsatz von Cookies nicht angeboten werden. Für diese ist es erforderlich, dass der Browser auch nach einem Seitenwechsel wiedererkannt wird.'''
					''''''
					'''Für folgende Anwendungen benötigen wir Cookies:'''
					''''''
					'''Rechtsgrundlage und berechtigtes Interesse:'''
					'''Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an einer nutzerfreundlichen Gestaltung unserer Website.'''
					''''''
					'''Empfänger:'''
					'''Empfänger der Daten sind ggf. technische Dienstleister, die für den Betrieb und die Wartung unserer Website als Auftragsverarbeiter tätig werden.'''
					''''''
					'''Drittlandtransfer:'''
					'''Die erhobenen Daten werden ggfs. in folgende Drittländer übertragen:'''
					''''''
					'''Nein'''
					''''''
					'''Folgende Datenschutzgarantien liegen vor:'''
					''''''
					'''Bereitstellung vorgeschrieben oder erforderlich:'''
					'''Die Bereitstellung der vorgenannten personenbezogenen Daten ist weder gesetzlich noch vertraglich vorgeschrieben. Ohne diese Daten ist jedoch der Dienst und die Funktionsfähigkeit unserer Website nicht gewährleistet. Zudem können einzelne Dienste und Services nicht verfügbar oder eingeschränkt sein.'''
					''''''
					'''Widerspruch'''
					'''Lesen Sie dazu die Informationen über Ihr Widerspruchsrecht nach Art. 21 DSGVO weiter unten.'''
					''''''
					'''Drittlandtransfer:'''
					'''Die erhobenen Daten werden ggfs. in folgende Drittländer übertragen:'''
					''''''
					'''Nein'''
					''''''
					'''Folgende Datenschutzgarantien liegen vor:'''
					''''''
					'''Erbringung kostenpflichtiger Leistungen'''
					'''Art und Zweck der Verarbeitung:'''
					'''Zur Erbringung kostenpflichtiger Leistungen werden von uns zusätzliche Daten erfragt, wie z.B. Zahlungsangaben, um Ihre Bestellung ausführen zu können.'''
					''''''
					'''Rechtsgrundlage:'''
					'''Die Verarbeitung der Daten, die für den Abschluss des Vertrages erforderlich ist, basiert auf Art. 6 Abs. 1 lit. b DSGVO.'''
					''''''
					'''Empfänger:'''
					'''Empfänger der Daten sind ggf. Auftragsverarbeiter.'''
					''''''
					'''Drittlandtransfer:'''
					'''Die erhobenen Daten werden ggfs. in folgende Drittländer übertragen:'''
					''''''
					'''Nein'''
					''''''
					'''Folgende Datenschutzgarantien liegen vor:'''
					''''''
					'''Speicherdauer:'''
					'''Wir speichern diese Daten in unseren Systemen bis die gesetzlichen Aufbewahrungsfristen abgelaufen sind. Diese betragen grundsätzlich 6 oder 10 Jahre aus Gründen der ordnungsmäßigen Buchführung und steuerrechtlichen Anforderungen.'''
					''''''
					'''Bereitstellung vorgeschrieben oder erforderlich:'''
					'''Die Bereitstellung Ihrer personenbezogenen Daten erfolgt freiwillig. Ohne die Bereitstellung Ihrer personenbezogenen Daten können wir Ihnen keinen Zugang auf unsere angebotenen Inhalte und Leistungen gewähren.'''
					''''''
					'''Drittlandtransfer:'''
					'''Die erhobenen Daten werden ggfs. in folgende Drittländer übertragen:'''
					''''''
					'''Nein'''
					''''''
					'''Folgende Datenschutzgarantien liegen vor:'''
					''''''
					'''Kontaktformular'''
					'''Art und Zweck der Verarbeitung:'''
					'''Die von Ihnen eingegebenen Daten werden zum Zweck der individuellen Kommunikation mit Ihnen gespeichert. Hierfür ist die Angabe einer validen E-Mail-Adresse sowie Ihres Namens erforderlich. Diese dient der Zuordnung der Anfrage und der anschließenden Beantwortung derselben. Die Angabe weiterer Daten ist optional.'''
					''''''
					'''Rechtsgrundlage:'''
					'''Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt auf der Grundlage eines berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO).'''
					''''''
					'''Durch Bereitstellung des Kontaktformulars möchten wir Ihnen eine unkomplizierte Kontaktaufnahme ermöglichen. Ihre gemachten Angaben werden zum Zwecke der Bearbeitung der Anfrage sowie für mögliche Anschlussfragen gespeichert.'''
					''''''
					'''Sofern Sie mit uns Kontakt aufnehmen, um ein Angebot zu erfragen, erfolgt die Verarbeitung der in das Kontaktformular eingegebenen Daten zur Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO).'''
					''''''
					'''Empfänger:'''
					'''Empfänger der Daten sind ggf. Auftragsverarbeiter.'''
					''''''
					'''Drittlandtransfer:'''
					'''Die erhobenen Daten werden ggfs. in folgende Drittländer übertragen:'''
					''''''
					'''Nein'''
					''''''
					'''Folgende Datenschutzgarantien liegen vor:'''
					''''''
					'''Speicherdauer:'''
					'''Daten werden spätestens 6 Monate nach Bearbeitung der Anfrage gelöscht.'''
					''''''
					'''Sofern es zu einem Vertragsverhältnis kommt, unterliegen wir den gesetzlichen Aufbewahrungsfristen nach HGB und löschen Ihre Daten nach Ablauf dieser Fristen.'''
					''''''
					'''Bereitstellung vorgeschrieben oder erforderlich:'''
					'''Die Bereitstellung Ihrer personenbezogenen Daten erfolgt freiwillig. Wir können Ihre Anfrage jedoch nur bearbeiten, sofern Sie uns Ihren Namen, Ihre E-Mail-Adresse und den Grund der Anfrage mitteilen.'''
					''''''
					'''Information über Ihr Widerspruchsrecht nach Art. 21 DSGVO'''
					'''Einzelfallbezogenes Widerspruchsrecht'''
					'''Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten, die aufgrund Art. 6 Abs. 1 lit. f DSGVO (Datenverarbeitung auf der Grundlage einer Interessenabwägung) erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmung gestütztes Profiling im Sinne von Art. 4 Nr. 4 DSGVO.'''
					''''''
					'''Legen Sie Widerspruch ein, werden wir Ihre personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.'''
					''''''
					'''Empfänger eines Widerspruchs'''
					'''Maria Schneider und Wolfgang Eberhart'''
					''''''
					'''Änderung unserer Datenschutzbestimmungen'''
					'''Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.'''
					''''''
					'''Fragen an den Datenschutzbeauftragten'''
					'''Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder wenden Sie sich direkt an die für den Datenschutz verantwortliche Person in unserer Organisation:'''
					''''''
					'''Die Datenschutzerklärung wurde mithilfe der activeMind AG erstellt, den Experten für externe Datenschutzbeauftragte (Version #2020-09-30).''''''
                    </Paper>
                </Grid>
                <Grid sm={3} item />
            </Grid>
        </Page>
    )
}

export default withNamespaces()(PrivacyPolicyScreen)
