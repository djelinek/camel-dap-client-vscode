import { BottomBarPanel, DebugToolbar, InputBox, TerminalView, WebDriver, Workbench, until } from "vscode-uitests-tooling";

export const HELLO_CAMEL_MESSAGE = 'Hello Camel from yaml';
export const DEBUGGER_ATTACHED_MESSAGE = 'debugger has been attached';
export const TEST_ARRAY_RUN = [
    'Routes startup',
    HELLO_CAMEL_MESSAGE
];

export const CAMEL_RUN_DEBUG_ACTION_LABEL = 'Run Camel Application with JBang and Debug';
export const CAMEL_RUN_ACTION_LABEL = 'Run Camel Application with JBang';
export const CAMEL_ROUTE_YAML_WITH_SPACE = 'demo route.camel.yaml';

/**
 * Executes a command in the command prompt of the workbench.
 * @param command The command to execute.
 * @returns A Promise that resolves when the command is executed.
 */
export async function executeCommand(command: string): Promise<void> {
    const workbench = new Workbench();
    await workbench.openCommandPrompt();
    const input = await InputBox.create();
    await input.setText(`>${command}`);
    await input.confirm();
}

/**
 * Checks if the terminal view has the specified texts in the given textArray.
 * @param driver The WebDriver instance to use.
 * @param textArray An array of strings representing the texts to search for in the terminal view.
 * @param interval (Optional) The interval in milliseconds to wait between checks. Default is 500ms.
 * @returns A Promise that resolves to a boolean indicating whether the terminal view has the texts or not.
 */
export async function waitUntilTerminalHasText(driver: WebDriver, textArray: string[], interval = 500): Promise<void> {
    await driver.wait(async function () {
        try {
            const terminal = await activateTerminalView();
            const terminalText = await terminal.getText();
            for (const text of textArray) {
                if (!(terminalText.includes(text))) {
                    return false;
                };
            }
            return true;
        } catch (err) {
            return false;
        }
    }, undefined, undefined, interval);
}

/**
 * Click on button to kill running process in Terminal View
 */
export async function killTerminal(): Promise<void> {
    await (await activateTerminalView()).killTerminal();
}

/**
 * Click on 'Disconnect' button in debug bar
 *
 * @param driver The WebDriver instance to use.
 */
export async function disconnectDebugger(driver: WebDriver): Promise<void> {
    const debugBar = await DebugToolbar.create();
    await debugBar.disconnect();
    await driver.wait(until.elementIsNotVisible(debugBar));
}

/**
 * Ensures Terminal View is opened and focused
 */
export async function activateTerminalView(): Promise<TerminalView> {
    await new Workbench().executeCommand('Terminal: Focus on Terminal View'); // workaround ExTester issue - https://github.com/redhat-developer/vscode-extension-tester/issues/785
    return await new BottomBarPanel().openTerminalView();
}