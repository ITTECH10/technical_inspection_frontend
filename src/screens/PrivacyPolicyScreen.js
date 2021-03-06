import React from 'react'
import { Grid, Paper, Button, Box } from '@material-ui/core'
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

    const handlePrivacyAcception = () => {
        acceptPrivacyPolicy(user._id)
        setAlertOpen(true)
        setAlertMsg("Vielen Dank, dass Sie unsere Datenschutzbestimmungen gelesen und akzeptiert haben!")

        history.push('/changePassword')
        history.go(0)
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
                        <div>
                            <h1>Datenschutzerkl??rung</h1>
                            <p>Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO), ist:</p>
                            <p>Schneider &amp; Eberhart Carmanagement GbR
                                <br />Geltinger Str. 23
                                <br />85652 Pliening
                                <br />
                                <br />Vertreten durch:
                                <br />Maria Schneider und Wolfgang Eberhart</p>
                            <h2>Ihre Betroffenenrechte</h2>
                            <p>Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten k??nnen Sie jederzeit folgende Rechte aus??ben:</p>
                            <ul>
                                <li>Auskunft ??ber Ihre bei uns gespeicherten Daten und deren Verarbeitung (Art. 15 DSGVO),</li>
                                <li>Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO),</li>
                                <li>L??schung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),</li>
                                <li>Einschr??nkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher Pflichten noch nicht l??schen d??rfen (Art. 18 DSGVO),</li>
                                <li>Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO) und</li>
                                <li>Daten??bertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt haben oder einen Vertrag mit uns abgeschlossen haben (Art. 20 DSGVO).</li>
                            </ul>
                            <p>Sofern Sie uns eine Einwilligung erteilt haben, k??nnen Sie diese jederzeit mit Wirkung f??r die Zukunft widerrufen.</p>
                            <p>Sie k??nnen sich jederzeit mit einer Beschwerde an eine Aufsichtsbeh??rde wenden, z. B. an die zust??ndige Aufsichtsbeh??rde des Bundeslands Ihres Wohnsitzes oder an die f??r uns als verantwortliche Stelle zust??ndige Beh??rde.</p>
                            <p>Eine Liste der Aufsichtsbeh??rden (f??r den nicht??ffentlichen Bereich) mit Anschrift finden Sie unter: <a href="https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html" target="_blank" rel="noopener nofollow noreferrer">https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html</a>.</p>
                            <p /><h2>Erfassung allgemeiner Informationen beim Besuch unserer Website</h2>
                            <h3>Art und Zweck der Verarbeitung:</h3>
                            <p>Wenn Sie auf unsere Website zugreifen, d.h., wenn Sie sich nicht registrieren oder anderweitig Informationen ??bermitteln, werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers, Ihre IP-Adresse und ??hnliches. </p>
                            <p>Sie werden insbesondere zu folgenden Zwecken verarbeitet:</p>
                            <ul>
                                <li>Sicherstellung eines problemlosen Verbindungsaufbaus der Website,</li>
                                <li>Sicherstellung einer reibungslosen Nutzung unserer Website,</li>
                                <li>Auswertung der Systemsicherheit und -stabilit??t sowie</li>
                                <li>zur Optimierung unserer Website.</li>
                            </ul>
                            <p>Wir verwenden Ihre Daten nicht, um R??ckschl??sse auf Ihre Person zu ziehen. Informationen dieser Art werden von uns ggfs. anonymisiert statistisch ausgewertet, um unseren Internetauftritt und die dahinterstehende Technik zu optimieren. </p>
                            <h3>Rechtsgrundlage und berechtigtes Interesse:</h3>
                            <p>Die Verarbeitung erfolgt gem???? Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an der Verbesserung der Stabilit??t und Funktionalit??t unserer Website.</p>
                            <h3>Empf??nger:</h3>
                            <p>Empf??nger der Daten sind ggf. technische Dienstleister, die f??r den Betrieb und die Wartung unserer Webseite als Auftragsverarbeiter t??tig werden.</p>
                            <p /><h3>Drittlandtransfer:</h3>
                            <p>Die erhobenen Daten werden ggfs. in folgende Drittl??nder ??bertragen: </p>
                            <p>Keine</p>
                            <p>Folgende Datenschutzgarantien liegen vor: </p>
                            <p /><h3>Speicherdauer:</h3>
                            <p>Die Daten werden gel??scht, sobald diese f??r den Zweck der Erhebung nicht mehr erforderlich sind. Dies ist f??r die Daten, die der Bereitstellung der Website dienen, grunds??tzlich der Fall, wenn die jeweilige Sitzung beendet ist. </p>
                            <p> Im Falle der Speicherung der Daten in Logfiles ist dies nach sp??testens 14 Tagen der Fall. Eine dar??berhinausgehende Speicherung ist m??glich. In diesem Fall werden die IP-Adressen der Nutzer anonymisiert, sodass eine  Zuordnung  des aufrufenden Clients nicht mehr m??glich ist.</p>
                            <p /><h3>Bereitstellung vorgeschrieben oder erforderlich:</h3>
                            <p>Die Bereitstellung der vorgenannten personenbezogenen Daten ist weder gesetzlich noch vertraglich vorgeschrieben. Ohne die IP-Adresse ist jedoch der Dienst und die Funktionsf??higkeit unserer Website nicht gew??hrleistet. Zudem k??nnen einzelne Dienste und Services nicht verf??gbar oder eingeschr??nkt sein. Aus diesem Grund ist ein Widerspruch ausgeschlossen. </p>
                            <p /><h2>Cookies</h2>
                            <p>Wie viele andere Webseiten verwenden wir auch so genannte ???Cookies???. Bei Cookies handelt es sich um kleine Textdateien, die auf Ihrem Endger??t (Laptop, Tablet, Smartphone o.??.) gespeichert werden, wenn Sie unsere Webseite besuchen. </p>
                            <p>Sie k??nnen Sie einzelne Cookies oder den gesamten Cookie-Bestand l??schen. Dar??ber hinaus erhalten Sie Informationen und Anleitungen, wie diese Cookies gel??scht oder deren Speicherung vorab blockiert werden k??nnen. Je nach Anbieter Ihres Browsers finden Sie die notwendigen Informationen unter den nachfolgenden Links:</p>
                            <ul>
                                <li>Mozilla Firefox: <a href="https://support.mozilla.org/de/kb/cookies-loeschen-daten-von-websites-entfernen" target="_blank" rel="nofollow noopener noreferrer">https://support.mozilla.org/de/kb/cookies-loeschen-daten-von-websites-entfernen</a></li>
                                <li>Internet Explorer: <a href="https://support.microsoft.com/de-de/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="nofollow noopener noreferrer">https://support.microsoft.com/de-de/help/17442/windows-internet-explorer-delete-manage-cookies</a></li>
                                <li>Google Chrome: <a href="https://support.google.com/accounts/answer/61416?hl=de" target="_blank" rel="nofollow noopener noreferrer">https://support.google.com/accounts/answer/61416?hl=de</a></li>
                                <li>Opera: <a href="http://www.opera.com/de/help" target="_blank" rel="nofollow noopener noreferrer">http://www.opera.com/de/help</a></li>
                                <li>Safari: <a href="https://support.apple.com/kb/PH17191?locale=de_DE&viewlocale=de_DE" target="_blank" rel="nofollow noopener noreferrer">https://support.apple.com/kb/PH17191?locale=de_DE&amp;viewlocale=de_DE</a></li>
                            </ul>
                            <h3>Speicherdauer und eingesetzte Cookies:</h3>
                            <p>Soweit Sie uns durch Ihre Browsereinstellungen oder Zustimmung die Verwendung von Cookies erlauben, k??nnen folgende Cookies auf unseren Webseiten zum Einsatz kommen:</p>
                            <p>1 Tag</p>
                            <h2>Technisch notwendige Cookies </h2>
                            <h3>Art und Zweck der Verarbeitung: </h3>
                            <p>Wir setzen Cookies ein, um unsere Website nutzerfreundlicher zu gestalten. Einige Elemente unserer Internetseite erfordern es, dass der aufrufende Browser auch nach einem Seitenwechsel identifiziert werden kann.</p>
                            <p>Der Zweck der Verwendung technisch notwendiger Cookies ist, die Nutzung von Websites f??r die Nutzer zu vereinfachen. Einige Funktionen unserer Internetseite k??nnen ohne den Einsatz von Cookies nicht angeboten werden. F??r diese ist es erforderlich, dass der Browser auch nach einem Seitenwechsel wiedererkannt wird.</p>
                            <p>F??r folgende Anwendungen ben??tigen wir Cookies:</p>
                            <p /><h3>Rechtsgrundlage und berechtigtes Interesse: </h3>
                            <p>Die Verarbeitung erfolgt gem???? Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an einer nutzerfreundlichen Gestaltung unserer Website.</p>
                            <h3>Empf??nger: </h3>
                            <p>Empf??nger der Daten sind ggf. technische Dienstleister, die f??r den Betrieb und die Wartung unserer Website als Auftragsverarbeiter t??tig werden.</p>
                            <p /><h3>Drittlandtransfer:</h3>
                            <p>Die erhobenen Daten werden ggfs. in folgende Drittl??nder ??bertragen: </p>
                            <p>Keine</p>
                            <p>Folgende Datenschutzgarantien liegen vor: </p>
                            <p /><h3>Bereitstellung vorgeschrieben oder erforderlich:</h3>
                            <p>Die Bereitstellung der vorgenannten personenbezogenen Daten ist weder gesetzlich noch vertraglich vorgeschrieben. Ohne diese Daten ist jedoch der Dienst und die Funktionsf??higkeit unserer Website nicht gew??hrleistet. Zudem k??nnen einzelne Dienste und Services nicht verf??gbar oder eingeschr??nkt sein.</p>
                            <h3>Widerspruch</h3>
                            <p>Lesen Sie dazu die Informationen ??ber Ihr Widerspruchsrecht nach Art. 21 DSGVO weiter unten.</p>
                            <p /><h3>Drittlandtransfer:</h3>
                            <p>Die erhobenen Daten werden ggfs. in folgende Drittl??nder ??bertragen: </p>
                            <p>Keine</p>
                            <p>Folgende Datenschutzgarantien liegen vor: </p>
                            <p /><h2>Erbringung kostenpflichtiger Leistungen</h2>
                            <h3>Art und Zweck der Verarbeitung:</h3>
                            <p>Zur Erbringung kostenpflichtiger Leistungen werden von uns zus??tzliche Daten erfragt, wie z.B. Zahlungsangaben, um Ihre Bestellung ausf??hren zu k??nnen.</p>
                            <h3>Rechtsgrundlage:</h3>
                            <p>Die Verarbeitung der Daten, die f??r den Abschluss des Vertrages erforderlich ist, basiert auf Art. 6 Abs. 1 lit. b DSGVO.</p>
                            <h3>Empf??nger:</h3>
                            <p>Empf??nger der Daten sind ggf. Auftragsverarbeiter.</p>
                            <p /><h3>Drittlandtransfer:</h3>
                            <p>Die erhobenen Daten werden ggfs. in folgende Drittl??nder ??bertragen: </p>
                            <p>Keine</p>
                            <p>Folgende Datenschutzgarantien liegen vor: </p>
                            <p /><h3>Speicherdauer:</h3>
                            <p>Wir speichern diese Daten in unseren Systemen bis die gesetzlichen Aufbewahrungsfristen abgelaufen sind. Diese betragen grunds??tzlich 6 oder 10 Jahre aus Gr??nden der ordnungsm????igen Buchf??hrung und steuerrechtlichen Anforderungen.</p>
                            <h3>Bereitstellung vorgeschrieben oder erforderlich:</h3>
                            <p>Die Bereitstellung Ihrer personenbezogenen Daten erfolgt freiwillig. Ohne die Bereitstellung Ihrer personenbezogenen Daten k??nnen wir Ihnen keinen Zugang auf unsere angebotenen Inhalte und Leistungen gew??hren.</p>
                            <p /><h3>Drittlandtransfer:</h3>
                            <p>Die erhobenen Daten werden ggfs. in folgende Drittl??nder ??bertragen: </p>
                            <p>Keine</p>
                            <p>Folgende Datenschutzgarantien liegen vor: </p>
                            <p /><h2>Kontaktformular</h2>
                            <h3>Art und Zweck der Verarbeitung:</h3>
                            <p>Die von Ihnen eingegebenen Daten werden zum Zweck der individuellen Kommunikation mit Ihnen gespeichert. Hierf??r ist die Angabe einer validen E-Mail-Adresse sowie Ihres Namens erforderlich. Diese dient der Zuordnung der Anfrage und der anschlie??enden Beantwortung derselben. Die Angabe weiterer Daten ist optional.</p>
                            <h3>Rechtsgrundlage:</h3>
                            <p>Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt auf der Grundlage eines berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO).</p>
                            <p>Durch Bereitstellung des Kontaktformulars m??chten wir Ihnen eine unkomplizierte Kontaktaufnahme erm??glichen. Ihre gemachten Angaben werden zum Zwecke der Bearbeitung der Anfrage sowie f??r m??gliche Anschlussfragen gespeichert.</p>
                            <p>Sofern Sie mit uns Kontakt aufnehmen, um ein Angebot zu erfragen, erfolgt die Verarbeitung der in das Kontaktformular eingegebenen Daten zur Durchf??hrung vorvertraglicher Ma??nahmen (Art. 6 Abs. 1 lit. b DSGVO).</p>
                            <h3>Empf??nger:</h3>
                            <p>Empf??nger der Daten sind ggf. Auftragsverarbeiter.</p>
                            <p /><h3>Drittlandtransfer:</h3>
                            <p>Die erhobenen Daten werden ggfs. in folgende Drittl??nder ??bertragen: </p>
                            <p>Keine</p>
                            <p>Folgende Datenschutzgarantien liegen vor: </p>
                            <p /><h3>Speicherdauer:</h3>
                            <p>Daten werden sp??testens 6 Monate nach Bearbeitung der Anfrage gel??scht.</p>
                            <p>Sofern es zu einem Vertragsverh??ltnis kommt, unterliegen wir den gesetzlichen Aufbewahrungsfristen nach HGB und l??schen Ihre Daten nach Ablauf dieser Fristen. </p>
                            <h3>Bereitstellung vorgeschrieben oder erforderlich:</h3>
                            <p>Die Bereitstellung Ihrer personenbezogenen Daten erfolgt freiwillig. Wir k??nnen Ihre Anfrage jedoch nur bearbeiten, sofern Sie uns Ihren Namen, Ihre E-Mail-Adresse und den Grund der Anfrage mitteilen.</p>
                            <p /><hr />
                            <h2>Information ??ber Ihr Widerspruchsrecht nach Art. 21 DSGVO</h2>
                            <h3>Einzelfallbezogenes Widerspruchsrecht</h3>
                            <p>Sie haben das Recht, aus Gr??nden, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten, die aufgrund Art. 6 Abs. 1 lit. f DSGVO (Datenverarbeitung auf der Grundlage einer Interessenabw??gung) erfolgt, Widerspruch einzulegen; dies gilt auch f??r ein auf diese Bestimmung gest??tztes Profiling im Sinne von Art. 4 Nr. 4 DSGVO.</p>
                            <p>Legen Sie Widerspruch ein, werden wir Ihre personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir k??nnen zwingende schutzw??rdige Gr??nde f??r die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten ??berwiegen, oder die Verarbeitung dient der Geltendmachung, Aus??bung oder Verteidigung von Rechtsanspr??chen.</p>
                            <h3>Empf??nger eines Widerspruchs</h3>
                            <p>Maria Schneider und Wolfgang Eberhart</p>
                            <hr />
                            <h2>??nderung unserer Datenschutzbestimmungen</h2>
                            <p>Wir behalten uns vor, diese Datenschutzerkl??rung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um ??nderungen unserer Leistungen in der Datenschutzerkl??rung umzusetzen, z.B. bei der Einf??hrung neuer Services. F??r Ihren erneuten Besuch gilt dann die neue Datenschutzerkl??rung.</p>
                            <h2>Fragen an den Datenschutzbeauftragten</h2>
                            <p>Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder wenden Sie sich direkt an die f??r den Datenschutz verantwortliche Person in unserer Organisation:</p>
                            <p /><p><em>Die Datenschutzerkl??rung wurde mithilfe der activeMind AG erstellt, den Experten f??r <a href="https://www.activemind.de/datenschutz/datenschutzbeauftragter/" target="_blank" rel="noopener noreferrer noreferrer">externe Datenschutzbeauftragte</a> (Version #2020-09-30).</em></p>
                        </div>

                        <Box className={classes.privacyActionBtns}>
                            <Button onClick={handlePrivacyAcception} variant="contained" color='primary'>Ich akzeptiere</Button>
                            <Button onClick={handlePrivacyDissagrement} variant="contained" color='primary' style={{ marginLeft: 10 }}>Abbrechen</Button>
                        </Box>
                    </Paper>
                </Grid>
                <Grid sm={3} item />
            </Grid>
        </Page>
    )
}

export default withNamespaces()(PrivacyPolicyScreen)
