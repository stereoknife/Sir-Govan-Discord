import * as D from 'discord.js';
import { MessageButtonStyles, MessageComponentTypes } from 'discord.js/typings/enums';
import { emojis } from '../defines';

import { Bot } from './bot';

type Dict<T> = { [key: string]: T }; 

export type ContextMenuFunc = (i: D.ContextMenuInteraction) => void;
export type SlashFunc = Function;
export type ButtonFunc = (i: D.ButtonInteraction, ...params: string[]) => void;
export type SelectMenuFunc = (i: D.SelectMenuInteraction, ...params: string[]) => void;

export function make_custom_id(name: string, ...params: string[]): string {
    return `${name}(${params.join(', ')})-${Date.now()}`;
}

export function extract_custom_id(id: string) {
    let match = id.match(/^(.*)\((.*)\)-(.*)$/);
    if (!match) return null;

    return {
        name: match[1],
        params: match[2].split(', '),
        time: match[3]
    };
}

export const context_menu_cmds: Dict<ContextMenuFunc> = {
    ["Retweet"](this: Bot, i: D.ContextMenuInteraction) {
        i.reply({
            content: "Choose",
            components: [
                new D.MessageActionRow({
                    components: [new D.MessageButton({
                        customId: `retweet_single(${i.targetId})-${i.createdTimestamp}`,
                        label: "Single retweet",
                        emoji: emojis.repeat_one.toString(),
                        style: MessageButtonStyles.PRIMARY
                    }), new D.MessageButton({
                        customId: `retweet_full(${i.targetId})-${i.createdTimestamp}`,
                        label: "Full retweet",
                        emoji: emojis.repeat.toString(),
                        style: MessageButtonStyles.PRIMARY
                    })]
                })
            ],
            ephemeral: true
        });
    },

    ["Retweet one"](this: Bot, i: D.ContextMenuInteraction) {

    }
};

export const slash_cmds: Dict<SlashFunc> = {

};

export const button_cmds: Dict<ButtonFunc> = {

};

export const select_menu_cmds: Dict<SelectMenuFunc> = {

}; 