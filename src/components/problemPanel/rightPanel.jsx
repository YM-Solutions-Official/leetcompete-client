import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { PacmanLoader } from "react-spinners";
import axios from "axios";
import { useBattle } from "../../context/BattleContext";

function RightPanel({ problem }) {
    const { saveUserCode, getUserCode } = useBattle();
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [code, setCode] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [testCaseHeight, setTestCaseHeight] = useState(200);
    const [output, setOutput] = useState(null);
    const [showOutput, setShowOutput] = useState(false);
    const isDraggingRef = useRef(false);

    const languageIds = {
        'cpp': 54,
        'javascript': 63,
        'python3': 71,
        'java': 62
    };

    useEffect(() => {
        if (!problem?._id) return;

        // Try to get saved code first
        const savedCode = getUserCode(problem._id, selectedLanguage);

        if (savedCode) {
            setCode(savedCode);
        } else {
            const snippet = problem.codeSnippets?.find(s => s.langSlug === selectedLanguage);
            setCode(snippet?.code || '');
        }

        setOutput(null);
        setShowOutput(false);
    }, [problem, selectedLanguage]);

    useEffect(() => {
        if (problem?._id && code) {
            saveUserCode(problem._id, selectedLanguage, code);
        }
    }, [code, problem?._id, selectedLanguage]);

    const getCodeSnippet = () => {
        if (!problem.codeSnippets) return '';
        const snippet = problem.codeSnippets.find(s => s.langSlug === selectedLanguage);
        return snippet?.code || '';
    };


    const handleLanguageChange = (lang) => {
        setSelectedLanguage(lang);

        const savedCode = getUserCode(problem._id, lang);
        if (savedCode) {
            setCode(savedCode);
        } else {
            const snippet = problem.codeSnippets?.find(s => s.langSlug === lang);
            setCode(snippet?.code || '');
        }
    };

    const allowedLanguages = ["cpp", "javascript", "python3", "java"];
    const availableLanguages =
        problem.codeSnippets
            ?.filter((s) => allowedLanguages.includes(s.langSlug))
            .map((s) => ({
                value: s.langSlug,
                label: s.lang,
                monacoLang:
                    s.langSlug === "cpp"
                        ? "cpp"
                        : s.langSlug === "python3"
                            ? "python"
                            : s.langSlug,
            })) || [];

    const currentLanguage =
        availableLanguages.find((l) => l.value === selectedLanguage)?.monacoLang ||
        "javascript";

    const prepareCode = (code, language) => {
        switch (language) {
            case 'cpp': {
                const headers = [
                    '#include <iostream>',
                    '#include <vector>',
                    '#include <string>',
                    '#include <algorithm>',
                    '#include <sstream>',
                    '#include <queue>',
                    '#include <map>',
                    '#include <unordered_map>',
                    '#include <set>',
                    '#include <unordered_set>',
                    'using namespace std;'
                ];

                // Extract method name by finding the first method in the Solution class
                const methodCallMatch = code.match(/class\s+Solution\s*{[^}]*?(\w+)\s*\([^)]*\)/s);
                const methodName = methodCallMatch ? methodCallMatch[1] : "solve";

                // Keep the Solution class from the user's code
                const userCode = code;

                // Generic main function that handles different input types
                const mainFunction = `
int main() {
    Solution sol;
    string line;
    
    // Get method signature to determine parameter types
    // Look for method in the Solution class
    string methodSignature = "";
    bool foundMethod = false;
    istringstream iss(code);
    string codeLine;
    while (getline(iss, codeLine)) {
        if (codeLine.find("class Solution") != string::npos) {
            while (getline(iss, codeLine)) {
                if (codeLine.find("${methodName}") != string::npos) {
                    methodSignature = codeLine;
                    foundMethod = true;
                    break;
                }
            }
            break;
        }
    }
    
    if (!foundMethod) {
        cerr << "Error: Method '${methodName}' not found in Solution class" << endl;
        return 1;
    }

    while (getline(cin, line)) {
        // Trim whitespace from input
        line.erase(0, line.find_first_not_of(" \\n\\r\\t"));
        line.erase(line.find_last_not_of(" \\n\\r\\t") + 1);
        
        if (line.empty()) continue;
        
        try {
            stringstream output;
            // Detect input type and convert accordingly
            if (line[0] == '[') { // Array/Vector input
                string arr = line.substr(1, line.length()-2);
                stringstream ss(arr);
                vector<int> nums;
                string num;
                
                while (getline(ss, num, ',')) {
                    // Trim whitespace
                    num.erase(0, num.find_first_not_of(" \\n\\r\\t"));
                    num.erase(num.find_last_not_of(" \\n\\r\\t") + 1);
                    if (!num.empty()) {
                        nums.push_back(stoi(num));
                    }
                }
                
                // Parse method parameters
                string params = line;
                vector<string> inputParams;
                size_t start = params.find('[');
                if (start != string::npos) {
                    size_t end = params.find(']', start);
                    if (end != string::npos) {
                        string arrayPart = params.substr(start, end - start + 1);
                        string remainingPart = params.substr(end + 1);
                        // Clean and split remaining parameters
                        remainingPart.erase(0, remainingPart.find_first_not_of(" ,"));
                        if (!remainingPart.empty()) {
                            inputParams.push_back(remainingPart);
                        }
                        // Process array
                        string arr = arrayPart.substr(1, arrayPart.length()-2);
                        stringstream ss(arr);
                        vector<int> nums;
                        string num;
                        while (getline(ss, num, ',')) {
                            num.erase(0, num.find_first_not_of(" \\n\\r\\t"));
                            num.erase(num.find_last_not_of(" \\n\\r\\t") + 1);
                            if (!num.empty()) {
                                nums.push_back(stoi(num));
                            }
                        }
                        
                        // Handle based on number of parameters
                        if (methodSignature.find("vector<int>&") != string::npos ||
                            methodSignature.find("vector<int>") != string::npos ||
                            methodSignature.find("const vector<int>&") != string::npos) {
                            
                            if (!inputParams.empty()) {
                                // Method takes both array and another parameter
                                int secondParam = stoi(inputParams[0]);
                                auto result = sol.${methodName}(nums, secondParam);
                                output << result;
                            } else {
                                // Method takes only array
                                auto result = sol.${methodName}(nums);
                                output << result;
                            }
                        } else {
                            cerr << "Error: Method ${methodName} doesn't accept vector<int> parameter" << endl;
                            return 1;
                        }
                    }
                }
            }
            else if (line == "true" || line == "false") { // Boolean input
                if (methodSignature.find("bool") != string::npos) {
                    bool val = (line == "true");
                    auto result = sol.${methodName}(val);
                    output << (result ? "true" : "false");
                } else {
                    cerr << "Error: Method ${methodName} doesn't accept bool parameter" << endl;
                    return 1;
                }
            }
            else { // Number or string input
                try {
                    int n = stoi(line);
                    if (methodSignature.find("int") != string::npos) {
                        auto result = sol.${methodName}(n);
                        output << result;
                    } else {
                        cerr << "Error: Method ${methodName} doesn't accept int parameter" << endl;
                        return 1;
                    }
                }
                catch (...) { // String input
                    if (methodSignature.find("string") != string::npos ||
                        methodSignature.find("const string&") != string::npos) {
                        auto result = sol.${methodName}(line);
                        output << result;
                    } else {
                        cerr << "Error: Method ${methodName} doesn't accept string parameter" << endl;
                        return 1;
                    }
                }
            }
            
            string result = output.str();
            // Trim any whitespace from result
            result.erase(0, result.find_first_not_of(" \\n\\r\\t"));
            result.erase(result.find_last_not_of(" \\n\\r\\t") + 1);
            cout << result;
        }
        catch (exception& e) {
            cerr << "Error: " << e.what() << endl;
            return 1;
        }
    }
    return 0;
}`;

                return headers.join('\n') + '\n\n' + userCode + '\n\n' + mainFunction;
            }

            case 'python3': {
                // Python solution wrapper
                const template = `
import sys
import json
from typing import List, Optional

${code}

def format_output(result):
    if isinstance(result, bool):
        return str(result).lower()
    elif isinstance(result, (list, dict)):
        return json.dumps(result, separators=(',', ':'))
    else:
        return str(result).strip()

def main():
    solution = Solution()
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
            
        try:
            # Try to parse as JSON array first
            try:
                if line.startswith('['):
                    input_data = json.loads(line)
                    if isinstance(input_data, list):
                        result = solution.solve(input_data)
                    else:
                        result = solution.solve(input_data)
                else:
                    raise json.JSONDecodeError("Not JSON", line, 0)
            except json.JSONDecodeError:
                # If not JSON, try other types
                if line.lower() == 'true':
                    result = solution.solve(True)
                elif line.lower() == 'false':
                    result = solution.solve(False)
                else:
                    try:
                        num = int(line)
                        result = solution.solve(num)
                    except ValueError:
                        result = solution.solve(line)
            
            print(format_output(result), end='')
        except Exception as e:
            print(f"Error: {str(e)}", file=sys.stderr)
            sys.exit(1)

if __name__ == "__main__":
    main()`;

                return template;
            }

            case 'javascript': {
                // JavaScript solution wrapper
                const template = `
${code}

// Function to format output consistently
function formatOutput(result) {
    if (typeof result === 'boolean') {
        return result.toString();
    } else if (Array.isArray(result) || typeof result === 'object') {
        return JSON.stringify(result);
    } else {
        return String(result).trim();
    }
}

// Main execution
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const solution = new Solution();

rl.on('line', (line) => {
    try {
        line = line.trim();
        if (!line) return;
        
        let result;
        // Try to parse as JSON first
        if (line.startsWith('[')) {
            try {
                const input = JSON.parse(line);
                if (Array.isArray(input)) {
                    result = solution.solve(input);
                } else {
                    result = solution.solve(input);
                }
            } catch (e) {
                throw new Error('Invalid array input');
            }
        } else if (line === 'true' || line === 'false') {
            result = solution.solve(line === 'true');
        } else if (!isNaN(line)) {
            result = solution.solve(Number(line));
        } else {
            result = solution.solve(line);
        }
        
        process.stdout.write(formatOutput(result));
    } catch (e) {
        console.error('Error:', e.message);
        process.exit(1);
    }
});`;

                return template;
            }

            case 'java': {
                // Java solution wrapper
                const template = `
import java.util.*;
import java.io.*;

${code}

public class Main {
    public static void main(String[] args) {
        Solution solution = new Solution();
        Scanner scanner = new Scanner(System.in);
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            
            try {
                if (line.startsWith("[")) {
                    // Handle array input
                    line = line.substring(1, line.length() - 1);
                    String[] elements = line.split(",");
                    int[] nums = new int[elements.length];
                    for (int i = 0; i < elements.length; i++) {
                        nums[i] = Integer.parseInt(elements[i].trim());
                    }
                    System.out.println(solution.solve(nums));
                }
                else if (line.equals("true") || line.equals("false")) {
                    // Handle boolean input
                    System.out.println(solution.solve(Boolean.parseBoolean(line)));
                }
                else {
                    try {
                        // Handle integer input
                        int n = Integer.parseInt(line);
                        System.out.println(solution.solve(n));
                    } catch (NumberFormatException e) {
                        // Handle string input
                        System.out.println(solution.solve(line));
                    }
                }
            } catch (Exception e) {
                System.out.println("Error: " + e.getMessage());
            }
        }
        scanner.close();
    }
}`;

                return template;
            }

            default:
                return code;
        }
    };

    const handleRunCode = async () => {
        if (!code.trim()) {
            setOutput({ error: "Please write some code first!" });
            setShowOutput(true);
            return;
        }

        setIsRunning(true);
        setShowOutput(true);
        setOutput(null);

        try {
            const preparedCode = prepareCode(code, selectedLanguage);
            const testCases = problem.testCases || [];

            if (testCases.length === 0) {
                setOutput({ error: "No test cases available" });
                setIsRunning(false);
                return;
            }

            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/evaluation/evaluate`,
                {
                    problemStatement: problem.title,
                    description: problem.description,
                    userCode: preparedCode,
                    testCases: problem.testCases,
                    language: selectedLanguage,
                },
                {
                    withCredentials: true,
                }
            );

            const result = response.data;

            if (result.status === "Syntax Error") {
                setOutput({
                    error: "Syntax Error",
                    message: result.error,
                });
            } else if (result.status === "Runtime Error") {
                setOutput({
                    error: "Runtime Error",
                    message: `Test case ${result.testCaseFailed} failed: ${result.error}`,
                    testResults: [
                        {
                            testCase: result.testCaseFailed,
                            passed: false,
                            input: result.input,
                            error: result.error,
                        },
                    ],
                });
            } else if (result.status === "Wrong Answer") {
                setOutput({
                    error: "Wrong Answer",
                    message: `Test case ${result.testCaseFailed} failed`,
                    testResults: [
                        {
                            testCase: result.testCaseFailed,
                            passed: false,
                            input: result.input,
                            expectedOutput: result.expectedOutput,
                            actualOutput: result.actualOutput,
                        },
                    ],
                });
            } else if (result.status === "Accepted") {
                setOutput({
                    success: true,
                    message: "All test cases passed!",
                    testCasesPassed: result.testCasesPassed,
                    totalTests: result.totalTestCases,
                });
            }
        } catch (error) {
            console.error("Code execution error:", error);
            setOutput({
                error: "Execution Failed",
                message:
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to execute code",
            });
        } finally {
            setIsRunning(false);
        }
    };

    const handleSubmit = async () => {
        setIsRunning(true);
        setShowOutput(true);
        setOutput(null);

        try {
            const preparedCode = prepareCode(code, selectedLanguage);
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/evaluation/evaluate`,
                {
                    problemStatement: problem.title,
                    description: problem.description,
                    userCode: preparedCode,
                    testCases: problem.testCases,
                    language: selectedLanguage,
                },
                {
                    withCredentials: true,
                }
            );

            const result = response.data;

            if (result.status === "Accepted") {
                // TODO: Save the successful submission to the user's history
                setOutput({
                    success: true,
                    message: "Solution Accepted! 🎉",
                    testCasesPassed: result.testCasesPassed,
                    totalTests: result.totalTestCases,
                });
            } else {
                setOutput({
                    error: result.status,
                    message: result.error || "Solution not accepted. Please check the error details.",
                    testResults: result.testResults || [{
                        testCase: result.testCaseFailed,
                        passed: false,
                        input: result.input,
                        expectedOutput: result.expectedOutput,
                        actualOutput: result.actualOutput,
                        error: result.error
                    }]
                });
            }
        } catch (error) {
            console.error("Submission error:", error);
            setOutput({
                error: "Submission Error",
                message: error.response?.data?.error || error.message || "Failed to submit solution"
            });
        } finally {
            setIsRunning(false);
        }
    };

    const handleResetCode = () => {
        const snippet = problem.codeSnippets?.find(
            (s) => s.langSlug === selectedLanguage
        );
        const defaultCode = snippet?.code || "";
        setCode(defaultCode);
        saveUserCode(problem._id, selectedLanguage, "");
        setOutput(null);
        setShowOutput(false);
    };
    const handleMouseDown = (e) => {
        e.preventDefault();
        isDraggingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!isDraggingRef.current) return;
        const container = document.getElementById('right-panel-container');
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const newHeight = containerRect.bottom - e.clientY;
        const minHeight = 100;
        const maxHeight = containerRect.height * 0.6;

        setTestCaseHeight(Math.max(minHeight, Math.min(maxHeight, newHeight)));
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    return (
        <div
            id="right-panel-container"
            className="w-full h-full bg-zinc-950 flex flex-col"
        >
            {/* Header */}
            <div className="p-4 border-b border-zinc-700 flex items-center justify-between">
                <select
                    value={selectedLanguage}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-700 focus:outline-none focus:border-blue-500"
                >
                    {availableLanguages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                            {lang.label}
                        </option>
                    ))}
                </select>

                <div className="flex gap-2">
                    <button
                        onClick={handleResetCode}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded border border-zinc-700 flex items-center gap-2"
                        title="Reset to default code"
                    >
                        ↻ Reset
                    </button>
                    <button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded border border-zinc-700 disabled:opacity-50 flex items-center gap-2"
                    >
                        {isRunning ? (
                            <>
                                <span>Running...</span>
                            </>
                        ) : (
                            <>▶ Run</>
                        )}
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium"
                    >
                        Submit
                    </button>
                </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1 overflow-hidden">
                <Editor
                    height="100%"
                    language={currentLanguage}
                    theme="vs-dark"
                    value={code || getCodeSnippet()}
                    onChange={(value) => setCode(value || "")}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: "on",
                        roundedSelection: false,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 4,
                        wordWrap: "on",
                    }}
                />
            </div>

            {/* Draggable Divider */}
            <div
                onMouseDown={handleMouseDown}
                className="h-1 bg-zinc-800 hover:bg-blue-600 cursor-ns-resize active:bg-blue-500 transition-colors"
            />

            {/* Test Cases / Output */}
            <div
                style={{ height: `${testCaseHeight}px` }}
                className="border-t border-zinc-700 overflow-hidden flex flex-col"
            >
                <div className="p-4 flex-1 overflow-y-auto">
                    {/* Tabs */}
                    <div className="flex gap-4 mb-3 border-b border-zinc-700">
                        <button
                            onClick={() => setShowOutput(false)}
                            className={`pb-2 px-1 font-semibold transition-colors ${!showOutput
                                ? 'text-blue-400 border-b-2 border-blue-400'
                                : 'text-zinc-400 hover:text-white'
                                }`}
                        >
                            Test Cases
                        </button>
                        <button
                            onClick={() => setShowOutput(true)}
                            className={`pb-2 px-1 font-semibold transition-colors ${showOutput
                                ? 'text-blue-400 border-b-2 border-blue-400'
                                : 'text-zinc-400 hover:text-white'
                                }`}
                        >
                            Output
                        </button>
                    </div>

                    {!showOutput ? (
                        // Test Cases Tab
                        <>
                            {problem.testCases && problem.testCases.length > 0 ? (
                                <div className="space-y-2">
                                    {problem.testCases.map((testCase, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-zinc-900 border border-zinc-700 rounded p-3"
                                        >
                                            <p className="text-zinc-400 text-xs mb-2 font-semibold">Test Case {idx + 1}</p>
                                            <pre className="text-sm font-mono whitespace-pre-wrap" style={{ color: '#ffffff' }}>
                                                {testCase}
                                            </pre>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-zinc-500 text-sm">No test cases available</p>
                            )}
                        </>
                    ) : (
                        // Output Tab
                        <div className="space-y-2">
                            {isRunning ? (
                                <div className="flex flex-col items-center justify-center py-8 gap-4">
                                    <PacmanLoader size={25} color="#3b82f6" />
                                    <p className="text-zinc-400">Executing code...</p>
                                </div>
                            ) : output ? (
                                <div className="bg-zinc-900 border border-zinc-700 rounded p-4">
                                    {output.error === "Syntax Error" || output.error === "Runtime Error" ? (
                                        // Show error message without test case details
                                        <div className="bg-zinc-950 rounded p-3 border border-red-900/30">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-red-400 font-semibold">✗ {output.error}</span>
                                            </div>
                                            <pre className="text-sm font-mono text-red-300 whitespace-pre-wrap">
                                                {output.message}
                                            </pre>
                                        </div>
                                    ) : output.success ? (
                                        // Show successful test case results
                                        <>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-green-400 font-semibold">✓ All Tests Passed!</span>
                                                <span className="text-zinc-500 text-xs">
                                                    {output.testCasesPassed} / {output.totalTests} test cases passed
                                                </span>
                                            </div>
                                            {output.testResults?.map((result, idx) => (
                                                <div key={idx} className="mb-4 last:mb-0">
                                                    <div className="bg-zinc-950 rounded p-3 border border-zinc-700">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <p className="text-zinc-400 text-xs">Test Case {result.testCase}</p>
                                                            <span className="text-green-400 text-xs">✓ Passed</span>
                                                        </div>
                                                        {result.input && (
                                                            <div className="mb-2">
                                                                <p className="text-zinc-500 text-xs mb-1">Input:</p>
                                                                <pre className="text-sm font-mono text-white whitespace-pre-wrap">{result.input}</pre>
                                                            </div>
                                                        )}
                                                        {result.output && (
                                                            <div>
                                                                <p className="text-zinc-500 text-xs mb-1">Output:</p>
                                                                <pre className="text-sm font-mono text-white whitespace-pre-wrap">{result.output}</pre>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        // Show wrong answer with test case details
                                        <>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-red-400 font-semibold">✗ Wrong Answer</span>
                                            </div>
                                            <div className="bg-zinc-950 rounded p-3 border border-red-900/30">
                                                {output.testResults?.map((result, idx) => (
                                                    <div key={idx}>
                                                        <p className="text-zinc-400 text-xs mb-2">Failed at Test Case {result.testCase}</p>
                                                        <div className="space-y-4">
                                                            {result.input && (
                                                                <div>
                                                                    <p className="text-zinc-500 text-xs mb-1">Input:</p>
                                                                    <pre className="text-sm font-mono text-zinc-300 whitespace-pre-wrap">{result.input}</pre>
                                                                </div>
                                                            )}
                                                            {result.expectedOutput && (
                                                                <div>
                                                                    <p className="text-zinc-500 text-xs mb-1">Expected Output:</p>
                                                                    <pre className="text-sm font-mono text-green-300 whitespace-pre-wrap">{result.expectedOutput}</pre>
                                                                </div>
                                                            )}
                                                            {result.actualOutput && (
                                                                <div>
                                                                    <p className="text-zinc-500 text-xs mb-1">Your Output:</p>
                                                                    <pre className="text-sm font-mono text-red-300 whitespace-pre-wrap">{result.actualOutput}</pre>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-zinc-500">
                                    <p>Click "Run" to execute your code</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RightPanel;
