import { AppDataSource } from "../data-source";
import { SlotTimetables } from "../entity/SlotTimetables";

async function createSlotTimetable() {
    const slotRepository = AppDataSource.getRepository(SlotTimetables);
    const existingSlots = await slotRepository.find();
    if (existingSlots.length > 0) {
        console.log("Slot timetable already exists.");
        return;
    }
    const slots = [
        { start_time: "09:00", end_time: "10:00" },
        { start_time: "10:00", end_time: "11:00" },
        { start_time: "11:00", end_time: "12:00" },
        { start_time: "12:00", end_time: "13:00" },
    ];
    for (const slot of slots) {
        const slotEntry = new SlotTimetables();
        slotEntry.start_time = slot.start_time;
        slotEntry.end_time = slot.end_time;
        await slotRepository.save(slotEntry);
    }
    console.log("Slot timetable created successfully.");
}
createSlotTimetable().catch((error) => {
    console.error("Error creating slot timetable:", error);
});
