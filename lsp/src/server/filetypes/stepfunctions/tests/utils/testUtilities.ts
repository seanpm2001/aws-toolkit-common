/*!
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 */

import { getLanguageService, JSONDocument } from 'vscode-json-languageservice'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { FILE_EXTENSIONS, LANGUAGE_IDS } from '../../constants/constants'

export function toDocument(text: string, isYaml?: boolean): { textDoc: TextDocument; jsonDoc: JSONDocument } {
    const textDoc = TextDocument.create(
        `foo://bar/file.${isYaml ? FILE_EXTENSIONS.YAML : FILE_EXTENSIONS.JSON}`,
        isYaml ? LANGUAGE_IDS.YAML : LANGUAGE_IDS.JSON,
        0,
        text
    )

    const ls = getLanguageService({})
    // tslint:disable-next-line: no-inferred-empty-object-type
    const jsonDoc = ls.parseJSONDocument(textDoc) as JSONDocument

    return { textDoc, jsonDoc }
}
