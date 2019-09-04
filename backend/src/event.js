import Henesis from '@haechi-labs/henesis-sdk-js'

export default async function ({config, model}) {
    const henesis = new Henesis();
    const subscription = await henesis.subscribe(
        config.integrationId,
        "streamedBlock"
    )
    subscription.on('message', async (message) => {
        const event = messageToEvent(message)
        model.save(event)
        console.log(`data received, event:${event.event}`)
        message.ack();
    });

    subscription.on('error', err => {
        console.error(err);
    });

    //parsing logic
    function messageToEvent(message) {
        const event = message.data[0].events[0];
        const blockMeta = message.data[0].blockMeta
        return {
            event: event.eventName.split('(')[0],
            contract: event.contractName,
            transactionHash: event.transaction.hash,
            args: dataToArgs(event.data),
            blockMeta
        }
        function dataToArgs(data) {
            const res = {}
            for (let item of data) {
                res[item.name] = item.value
            }
            return res
        }
    }
}