[![Build and Test](https://github.com/camel-tooling/camel-dap-client-vscode/actions/workflows/ci.yaml/badge.svg)](https://github.com/camel-tooling/camel-dap-client-vscode/actions/workflows/ci.yaml)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=camel-tooling_camel-dap-client-vscode&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=camel-tooling_camel-dap-client-vscode)

# VS Code Debug Adapter client for Apache Camel

![A breakpoint hit on a Camel route endpoint and the variables displayed](./docs/images/breakpoint.png)

## How to use it

### Happy path

- Ensure `jbang` is available on system command-line
- Open a Camel route which can be started with JBang
- Call command Palette (`Ctrl+Alt+P`), and pick command `Start Camel Application with JBang and debug` or click on codelens `Camel Debug with JBang` which appears on top of the file.
- Wait that the route is started and debugger is connected
- Put a breakpoint on the Camel route
- Enjoy!

![Happy path to start and debug Camel route](./docs/images/singleClickCamelDebugWithJBangWithoutVSCodeConfiguration.gif)

### Advanced use cases

#### Use a Debug Launch configuration

- Start a Camel 3.16+ application with `camel-debug` on the classpath
- In `.vscode/launch.json`, provide this kind of content for a local default JMX connection (which is `service:jmx:rmi:///jndi/rmi://localhost:1099/jmxrmi/camel`):

```json
  {
	"version": "0.2.0",
	"configurations": [
		{
			"type": "apache.camel",
			"request": "attach",
			"name": "Attach Camel Debugger"
		}
	]
  }
  ```
- In `Run and Debug` panel, launch the `Attach Camel Debugger`
- Put a breakpoint on the Camel route
- Enjoy!

#### Configuration possibilities of the Debug Launch configuration

In `.vscode/launch.json`, provide this kind of content for a local default JMX connection (which is `service:jmx:rmi:///jndi/rmi://localhost:1099/jmxrmi/camel`):

```json
  {
	"version": "0.2.0",
	"configurations": [
		{
			"type": "apache.camel",
			"request": "attach",
			"name": "Attach Camel Debugger"
		}
	]
  }
  ```
or for a specific JMX Url:
  ```json
  {
	"version": "0.2.0",
	"configurations": [
		{
			"type": "apache.camel",
			"request": "attach",
			"name": "Attach Camel Debugger",
			"attach_jmx_url": "service:jmx:rmi:///jndi/rmi://localhost:1099/jmxrmi/camel"
		}
	]
  }
  ```
or for a local connection using PID of the Camel application process:
  ```json
  {
	"version": "0.2.0",
	"configurations": [
		{
			"type": "apache.camel",
			"request": "attach",
			"name": "Attach Camel Debugger",
			"attach_pid": "857136"
		}
	]
  }
  ```

## Features

- Support use of Camel debugger by attaching to a running Camel route written in Java, Yaml or XML (only `Camel Main` mode for XML) using the JMX Url
- Support local use of Camel debugger by attaching to a running Camel route written in Java, Yaml or XML (only `Camel Main` mode for XML) using the PID
- Support a single Camel context
- Add/Remove breakpoint
- Support conditional breakpoint with `simple` language. See [here](https://camel.apache.org/components/latest/languages/simple-language.html) for details on how to write condition with simple language.
- Inspect variable values on suspended breakpoints
- Resume a single route instance and resume all route instances
- Stepping when the route definition is in the same file
- Allow to update values of variables:
  - in scope `Debugger`
  - the message body
  - a message header when it is of type String
  - an exchange property when it is of type String
- Command `Start Camel Application with JBang and debug`. It allows a one-click start and Camel debug in simple cases. This command is available through:
  - Command Palette. It requires having a valid Camel file opened in editor.
  - Contextual menu in File explorer. It is visible to all `*.xml`, `*.java`, `*.yaml` and `*.yml`. It is up to the user to ensure it is a Camel route file. The command is also opening the files in editor to be ready to place breakpoints.
  - Codelens at the top of a Camel file (the heuristic for the codelens is checking that there is a `from` and a `to` or a `log` on `java`, `xml` and `yaml` files).
- Configuration snippets for Camel debugger launch configuration
- Configuration snippets to launch Camel application ready to accept a Camel debugger connection using JBang or Maven with Camel maven plugin or Quarkus Devs

## Requirements

Java Runtime Environment 11+ with com.sun.tools.attach.VirtualMachine (available in most JVMs such as Hotspot and OpenJDK) must be available on system path.

For some features, [JBang](https://www.jbang.dev/) must be available on command-line.

The Camel instance to debug must follow these requirements:
  - Camel 3.16+
  - Have `camel-debug` on the classpath
  - Have JMX enabled

## Usage data

The Debug Adapter for Apache Camel by Red Hat extension collects anonymous [usage data](USAGE_DATA.md) and sends it to Red Hat servers to help improve our products and services. Read our [privacy statement](https://developers.redhat.com/article/tool-data-collection) to learn more. This extension respects the redhat.telemetry.enabled setting which you can learn more about at https://github.com/redhat-developer/vscode-redhat-telemetry#how-to-disable-telemetry-reporting
