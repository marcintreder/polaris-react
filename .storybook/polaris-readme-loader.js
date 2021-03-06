/* eslint-disable no-console */
const chalk = require('chalk');
const grayMatter = require('gray-matter');
const MdParser = require('./md-parser');
const React = require('react');

const HOOK_PREFIX = 'use';

/**
 * A Webpack loader, that expects a Polaris README file, and returns metadata,
 * and the examples contained within the readme.
 *
 * The `code` property of the examples are functions that will render a JSX
 * component when called with a scope object that contains React and Polaris's
 * exports. This allows us to inject all Polaris components into the function's
 * scope whilemaintaining the current scope that contains the Babel helper
 * functions. Unfortunatly this is only possible using eval() to
 * generate a function with the correct local scope by dynamically creating
 * a parameters list.
 */
module.exports = function loader(source) {
  this.cacheable();

  const readme = parseCodeExamples(source);

  // Work around JSON.stringify() not supporting functions.
  // First replace all code functions within the data with a placeholder string.
  // This transforms:
  // { code: function() {/* blah */ } }
  // into:
  // { code: "___CODEPLACEHOLDER__0__0___" }
  const readmeWithPlaceholders = {
    ...readme,
    examples: readme.examples.map((example, exampleIdx) => ({
      ...example,
      code: `___CODEPLACEHOLDER__${exampleIdx}___`,
    })),
  };

  // Then stringify the data, and replace all the placeholder strings with the
  // with the function declaration.
  // This transforms:
  // { code: "___CODEPLACEHOLDER__0__0___" }
  // back into:
  // { code: function() {/* blah */ } }
  const stringyReadme = JSON.stringify(readmeWithPlaceholders, null, 2).replace(
    /"___CODEPLACEHOLDER__(\d+)___"/g,
    (_, exampleIdx) => readme.examples[exampleIdx].code.toString(),
  );

  // Example code does not have any scope attached to it by default. It boldly
  // states `<Button>An example Button</Button>`, blindly trusting that `Button`
  // is available in its scope.
  //
  // codeInvoker is responsible for injecting Polaris into the scope for a
  // function so that it will work. It does this by creating a new function with
  // all the Polaris exports defined as parameters and then calling that new
  // function.
  const codeInvoker = function(fn) {
    const scope = Object.assign({}, Polaris);

    // Replace the empty parameter list with a list based upon the scope.
    // We can't use a placeholder in the parmeter list and search/replace that
    // because the placeholder's name may be mangled when the code is minified.
    const args = Object.keys(scope).join(', ');
    const fnString = fn
      .toString()
      .replace(/^function(\s*)\(\)/, `function$1(${args})`);

    // eslint-disable-next-line no-eval
    return eval(`(${fnString})`).apply(null, Object.values(scope));
  };

  const hooks = Object.keys(React)
    .filter((key) => key.startsWith(HOOK_PREFIX))
    .join(', ');

  return `
import React, {${hooks}} from 'react';
import * as Polaris from '@shopify/polaris';
import {
  PlusMinor,
  AlertMinor,
  ArrowDownMinor,
  ArrowLeftMinor,
  ArrowRightMinor,
  ArrowUpMinor,
  ArrowUpDownMinor,
  CalendarMinor,
  MobileCancelMajorMonotone,
  CancelSmallMinor,
  CaretDownMinor,
  CaretUpMinor,
  TickSmallMinor,
  ChevronDownMinor,
  ChevronLeftMinor,
  ChevronRightMinor,
  ChevronUpMinor,
  CircleCancelMinor,
  CircleChevronDownMinor,
  CircleChevronLeftMinor,
  CircleChevronRightMinor,
  CircleChevronUpMinor,
  CircleInformationMajorTwotone,
  CirclePlusMinor,
  CirclePlusOutlineMinor,
  ConversationMinor,
  DeleteMinor,
  CircleDisableMinor,
  DisputeMinor,
  DuplicateMinor,
  EmbedMinor,
  ExportMinor,
  ExternalMinor,
  QuestionMarkMajorTwotone,
  HomeMajorMonotone,
  HorizontalDotsMinor,
  ImportMinor,
  LogOutMinor,
  MobileHamburgerMajorMonotone,
  NoteMinor,
  NotificationMajorMonotone,
  OnlineStoreMajorTwotone,
  OrdersMajorTwotone,
  PrintMinor,
  ProductsMajorTwotone,
  ProfileMinor,
  RefreshMinor,
  RiskMinor,
  SaveMinor,
  SearchMinor,
  MinusMinor,
  ViewMinor,
} from '@shopify/polaris-icons';

const codeInvoker = ${codeInvoker};

export const component = ${stringyReadme};
`;
};

const exampleForRegExp = /<!-- example-for: ([\w\s,]+) -->/u;

function stripCodeBlock(block) {
  return block
    .replace(/```jsx/, '')
    .replace('```', '')
    .trim();
}

function isExampleForPlatform(exampleMarkdown, platform) {
  const foundExampleFor = exampleMarkdown.match(exampleForRegExp);

  if (!foundExampleFor) {
    return true;
  }

  return foundExampleFor[1].includes(platform);
}

function parseCodeExamples(data) {
  const matter = grayMatter(data);

  return {
    name: matter.data.name,
    category: matter.data.category,
    examples: generateExamples(matter),
  };
}

function generateExamples(matter) {
  if (matter.data.platforms && !matter.data.platforms.includes('web')) {
    const ignoredPlatforms = matter.data.platforms.join(',');
    console.log(
      chalk`ℹ️  {grey [${
        matter.data.name
      }] Component examples are ignored (platforms: ${ignoredPlatforms})}`,
    );

    return [];
  }

  if (matter.data.hidePlayground) {
    console.log(
      chalk`ℹ️  {grey [${
        matter.data.name
      }] Component examples are ignored (hidePlayground: true)}`,
    );

    return [];
  }

  const introAndComponentSections = matter.content
    .split(/(\n---\n)/)
    .map((content) => content.replace('---\n', '').trim())
    .filter((content) => content !== '');
  const [, ...componentSections] = introAndComponentSections;

  const examplesAndHeader = componentSections
    .filter((markdown) => markdown.startsWith('## Examples'))
    .join('')
    .split('###');

  const [, ...allExamples] = examplesAndHeader;

  if (allExamples.length === 0) {
    console.log(
      chalk`🚨 {red [${
        matter.data.name
      }]} No examples found. For troubleshooting advice see https://github.com/Shopify/polaris-react/blob/master/documentation/Component%20READMEs.md#troubleshooting`,
    );
  }

  const nameRegex = /(.)*/;
  const codeRegex = /```jsx(.|\n)*?```/g;

  const examples = allExamples
    .filter((example) => isExampleForPlatform(example, 'web'))
    .map((example) => {
      const nameMatches = example.match(nameRegex);
      const codeBlock = example.match(codeRegex);

      const name = nameMatches !== null ? nameMatches[0].trim() : '';
      const code =
        codeBlock !== null ? wrapExample(stripCodeBlock(codeBlock[0])) : '';

      const description = new MdParser().parse(
        filterMarkdownForPlatform(
          example
            .replace(nameRegex, '')
            .replace(codeRegex, '')
            .replace(exampleForRegExp, ''),
          'web',
        ).trim(),
      );

      return {name, code, description};
    });

  if (examples.filter((example) => example.code).length === 0) {
    console.log(
      chalk`🚨 {red [${matter.data.name}]} At least one React example expected`,
    );
  }

  examples.forEach((example) => {
    if (example.code === '') {
      console.log(
        chalk`🚨 {red [${matter.data.name}]} Example “${
          example.name
        }” is missing a React example`,
      );
    }
  });

  return examples;
}

function filterMarkdownForPlatform(markdown, platform) {
  const unwrapSinglePlatformContentRegExp = new RegExp(
    `<!-- content-for: ${platform} -->([\\s\\S]+?)<!-- \\/content-for -->`,
    'gu',
  );

  const deleteSinglePlatformContentRegExp = new RegExp(
    `<!-- content-for: (?:[\\w\\s]*) -->([\\s\\S]+?)<!-- \\/content-for -->`,
    'gu',
  );

  const unwrapMultiplatformContentRegExp = new RegExp(
    `<!-- content-for: (?:[\\w\\s,]*${platform}[\\w\\s,]*) -->([\\s\\S]+?)<!-- \\/content-for -->`,
    'gu',
  );
  const deleteRemainingPlatformsRegExp = /<!-- content-for: [\w\s,]+ -->[\s\S]+?<!-- \/content-for -->/gu;

  return (
    markdown
      // Unwrap content in multiple passes to support nested content-for blocks
      .replace(unwrapSinglePlatformContentRegExp, '$1')
      .replace(deleteSinglePlatformContentRegExp, '')
      .replace(unwrapMultiplatformContentRegExp, '$1')
      .replace(deleteRemainingPlatformsRegExp, '')
  );
}

function wrapExample(code) {
  const classPattern = /class (\w+) extends React.Component/g;
  const functionPattern = /^function (\w+)/g;
  const fullComponentDefinitionMatch =
    classPattern.exec(code) || functionPattern.exec(code);

  let wrappedCode = '';

  if (fullComponentDefinitionMatch) {
    wrappedCode = `${code}
return ${fullComponentDefinitionMatch[1]};
`;
  } else {
    wrappedCode = `return function() {
      return (
        ${code}
      );
    }`;
  }

  // The eagle-eyed amongst you will spot that the function passed to
  // codeInvoker has no arguments. This is because the codeInvoker function
  // shall dynamically modify the given function, adding items from the current
  // scope as arguments. We can't do this with some kind of placeholder value
  // (e.g. codeInvoker(function(PLACEHOLDER) {}, scope) and then replace the
  // PLACEHOLDER because its name will get mangled as part of minification in
  // production mode and thus searching for "PLACEHOLDER in the function's
  // string representation shall fail.
  return `function () {
    return codeInvoker(function () {
      ${wrappedCode}
    });
  }`;
}
