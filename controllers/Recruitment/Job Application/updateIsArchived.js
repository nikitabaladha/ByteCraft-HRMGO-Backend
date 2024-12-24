const Item = require('../../../models/JobApplication'); 

// Toggle archive status
const toggleArchiveStatus = async (req, res) => {
  try {
    const { id } = req.params; 
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.isArchived = !item.isArchived;
    await item.save();

    return res.status(200).json({
      message: `Item ${item.isArchived ? 'archived' : 'unarchived'} successfully`,
      item,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = toggleArchiveStatus
